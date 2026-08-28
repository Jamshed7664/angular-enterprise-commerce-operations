import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Customer, Order, Product } from '../../../core/models/domain.models';
import {
  CatalogService,
  CustomerService,
  OrderService,
} from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PageHeaderComponent,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly catalog = inject(CatalogService);
  private readonly customersService = inject(CustomerService);
  private readonly orders = inject(OrderService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly products = signal<Product[]>([]);
  readonly customers = signal<Customer[]>([]);
  readonly existingOrder = signal<Order | null>(null);
  readonly editId = Number(this.route.snapshot.paramMap.get('id')) || 0;

  readonly form = this.fb.nonNullable.group({
    customerId: [1, Validators.required],
    shippingFee: [8, Validators.min(0)],
    discountTotal: [0, Validators.min(0)],
    internalNotes: [''],
    lines: this.fb.array([this.lineGroup()]),
  });

  get lines(): FormArray {
    return this.form.controls.lines;
  }

  ngOnInit(): void {
    this.catalog.list().subscribe((items) => {
      this.products.set(items);

      if (this.editId) {
        this.loadExistingOrder();
      }
    });

    this.customersService.list().subscribe((items) => {
      this.customers.set(items);
    });
  }

  addLine(): void {
    this.lines.push(this.lineGroup());
  }

  removeLine(index: number): void {
    if (this.lines.length > 1) {
      this.lines.removeAt(index);
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const existing = this.existingOrder();

    if (existing && existing.status !== 'Draft') {
      return;
    }

    const value = this.form.getRawValue();
    const customer = this.customers().find(
      (item) => item.id === value.customerId,
    );

    if (!customer) {
      return;
    }

    const lines = value.lines.map((line, index) => {
      const product = this.products().find(
        (item) => item.id === line.productId,
      );

      if (!product) {
        throw new Error('Selected product was not found.');
      }

      return {
        id: existing?.lines[index]?.id ?? Date.now() + index,
        productId: product.id,
        variantId: product.variants[0]?.id,
        sku: product.sku,
        title: product.title,
        imageUrl: product.imageUrl,
        quantity: line.quantity,
        unitPrice: product.basePrice,
        discount: 0,
        fulfilledQuantity: existing?.lines[index]?.fulfilledQuantity ?? 0,
        returnedQuantity: existing?.lines[index]?.returnedQuantity ?? 0,
      };
    });

    const subtotal = lines.reduce(
      (sum, line) => sum + line.quantity * line.unitPrice,
      0,
    );

    const now = new Date().toISOString();

    const payload: Partial<Order> = {
      customerId: customer.id,
      updatedAt: now,
      subtotal,
      shippingFee: value.shippingFee,
      discountTotal: value.discountTotal,
      taxTotal: 0,
      grandTotal: subtotal + value.shippingFee - value.discountTotal,
      billingAddress: customer.addresses[0],
      shippingAddress: customer.addresses[0],
      lines,
      internalNotes: value.internalNotes,
    };

    if (existing) {
      this.orders.update(existing.id, payload).subscribe((order) => {
        void this.router.navigate(['/orders', order.id]);
      });
      return;
    }

    this.orders
      .create({
        ...payload,
        orderNumber: `CO-${Date.now().toString().slice(-6)}`,
        createdAt: now,
        status: 'Draft',
        paymentStatus: 'Pending',
        fulfillmentStatus: 'Unfulfilled',
        shipmentStatus: 'Pending',
        customerNote: '',
        tags: ['manual'],
      })
      .subscribe((order) => {
        void this.router.navigate(['/orders', order.id]);
      });
  }

  private loadExistingOrder(): void {
    this.orders.get(this.editId).subscribe((order) => {
      this.existingOrder.set(order);

      if (order.status !== 'Draft') {
        void this.router.navigate(['/orders', order.id]);
        return;
      }

      this.lines.clear();

      order.lines.forEach((line) => {
        this.lines.push(this.lineGroup(line.productId, line.quantity));
      });

      this.form.patchValue({
        customerId: order.customerId,
        shippingFee: order.shippingFee,
        discountTotal: order.discountTotal,
        internalNotes: order.internalNotes,
      });
    });
  }

  private lineGroup(productId = 1, quantity = 1) {
    return this.fb.nonNullable.group({
      productId: [productId, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
    });
  }
}
