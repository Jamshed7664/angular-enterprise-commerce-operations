import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  Customer,
  Order,
  Refund,
  ReturnRequest,
} from '../../../core/models/domain.models';
import {
  CustomerService,
  OrderService,
  RefundService,
  ReturnService,
} from '../../../core/services/commerce.services';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusChipComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly customers = inject(CustomerService);
  private readonly ordersService = inject(OrderService);
  private readonly returnsService = inject(ReturnService);
  private readonly refundsService = inject(RefundService);

  readonly customer = signal<Customer | null>(null);
  readonly orders = signal<Order[]>([]);
  readonly returns = signal<ReturnRequest[]>([]);
  readonly refunds = signal<Refund[]>([]);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.customers.get(id).subscribe((value) => {
      this.customer.set(value);
    });

    this.ordersService.list({ customerId: id }).subscribe((orders) => {
      this.orders.set(orders);
      const orderIds = new Set(orders.map((order) => order.id));

      this.returnsService.list().subscribe((returns) => {
        this.returns.set(
          returns.filter((request) => orderIds.has(request.orderId)),
        );
      });

      this.refundsService.list().subscribe((refunds) => {
        this.refunds.set(
          refunds.filter((refund) => orderIds.has(refund.orderId)),
        );
      });
    });
  }
}
