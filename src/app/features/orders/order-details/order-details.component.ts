import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  ActivityEntry,
  Fulfillment,
  Order,
  Refund,
  ReturnRequest,
  Shipment,
} from '../../../core/models/domain.models';
import {
  FulfillmentService,
  OrderService,
  RefundService,
  ReturnService,
  ShipmentService,
} from '../../../core/services/commerce.services';
import { ProductImageComponent } from '../../../shared/components/product-image/product-image.component';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductImageComponent,
    StatusChipComponent,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly orders = inject(OrderService);
  private readonly fulfillmentService = inject(FulfillmentService);
  private readonly shipmentService = inject(ShipmentService);
  private readonly returnService = inject(ReturnService);
  private readonly refundService = inject(RefundService);

  readonly order = signal<Order | null>(null);
  readonly activity = signal<ActivityEntry[]>([]);
  readonly fulfillment = signal<Fulfillment | null>(null);
  readonly shipment = signal<Shipment | null>(null);
  readonly returns = signal<ReturnRequest[]>([]);
  readonly refunds = signal<Refund[]>([]);

  private id = 0;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.reload();
  }

  markPaid(): void {
    const order = this.order();

    if (!order || order.status === 'Cancelled') {
      return;
    }

    this.orders
      .transition(order, { paymentStatus: 'Paid' }, 'Payment marked as Paid')
      .subscribe(() => this.reload());
  }

  confirm(): void {
    const order = this.order();

    if (!order || order.status !== 'Draft') {
      return;
    }

    this.orders
      .transition(order, { status: 'Confirmed' }, 'Order confirmed')
      .subscribe(() => this.reload());
  }

  cancel(): void {
    const order = this.order();

    if (!order || order.fulfillmentStatus === 'Fulfilled') {
      return;
    }

    this.orders
      .transition(order, { status: 'Cancelled' }, 'Order cancelled')
      .subscribe(() => this.reload());
  }

  startFulfillment(): void {
    const order = this.order();

    if (
      !order ||
      order.status === 'Cancelled' ||
      order.paymentStatus !== 'Paid'
    ) {
      return;
    }

    const existing = this.fulfillment();

    if (existing) {
      this.fulfillmentService
        .update(existing.id, {
          status: 'Picking',
          pickedAt: new Date().toISOString(),
        })
        .subscribe(() => {
          this.transitionToPicking(order);
        });
      return;
    }

    this.fulfillmentService
      .create({
        orderId: order.id,
        status: 'Picking',
        warehouse: 'Main Fulfillment Center',
        pickedAt: new Date().toISOString(),
        packageCount: 1,
        notes: '',
        createdAt: new Date().toISOString(),
      })
      .subscribe(() => {
        this.transitionToPicking(order);
      });
  }

  pack(): void {
    const order = this.order();
    const fulfillment = this.fulfillment();

    if (!order || !fulfillment || fulfillment.status !== 'Picking') {
      return;
    }

    this.fulfillmentService
      .update(fulfillment.id, {
        status: 'Packed',
        packedAt: new Date().toISOString(),
      })
      .subscribe(() => {
        this.orders
          .transition(
            order,
            {
              fulfillmentStatus: 'Packed',
              shipmentStatus: 'Ready to Ship',
            },
            'Order packed and ready to ship',
          )
          .subscribe(() => this.reload());
      });
  }

  createShipment(): void {
    const order = this.order();
    const fulfillment = this.fulfillment();

    if (
      !order ||
      !fulfillment ||
      fulfillment.status !== 'Packed' ||
      this.shipment()
    ) {
      return;
    }

    this.shipmentService
      .create({
        orderId: order.id,
        fulfillmentId: fulfillment.id,
        carrier: 'DHL Express',
        serviceLevel: 'Express',
        trackingNumber: `DHL${Date.now().toString().slice(-8)}`,
        status: 'Ready to Ship',
        estimatedDelivery: new Date(
          Date.now() + 3 * 86_400_000,
        ).toISOString(),
      })
      .subscribe(() => this.reload());
  }

  markShipped(): void {
    const order = this.order();
    const shipment = this.shipment();

    if (!order || !shipment) {
      return;
    }

    this.shipmentService
      .update(shipment.id, {
        status: 'Shipped',
        shipDate: new Date().toISOString(),
      })
      .subscribe(() => {
        this.orders
          .transition(
            order,
            {
              fulfillmentStatus: 'Fulfilled',
              shipmentStatus: 'Shipped',
              lines: order.lines.map((line) => ({
                ...line,
                fulfilledQuantity: line.quantity,
              })),
            },
            'Shipment dispatched',
          )
          .subscribe(() => this.reload());
      });
  }

  markDelivered(): void {
    const order = this.order();
    const shipment = this.shipment();

    if (!order || !shipment) {
      return;
    }

    this.shipmentService
      .update(shipment.id, {
        status: 'Delivered',
        deliveredDate: new Date().toISOString(),
      })
      .subscribe(() => {
        this.orders
          .transition(
            order,
            {
              status: 'Completed',
              shipmentStatus: 'Delivered',
            },
            'Order delivered',
          )
          .subscribe(() => this.reload());
      });
  }

  createReturn(): void {
    const order = this.order();

    if (!order || order.shipmentStatus !== 'Delivered') {
      return;
    }

    const amount = Math.min(
      order.grandTotal,
      order.lines[0]?.unitPrice ?? order.grandTotal,
    );

    this.returnService
      .create({
        orderId: order.id,
        status: 'Requested',
        reason: 'Customer return',
        customerComment: 'Demo return request',
        resolution: 'Refund',
        amount,
        createdAt: new Date().toISOString(),
      })
      .subscribe(() => {
        this.orders
          .transition(order, {}, 'Return requested')
          .subscribe(() => this.reload());
      });
  }

  resolveReturn(): void {
    const request = this.returns()[0];

    if (!request) {
      return;
    }

    this.returnService
      .update(request.id, {
        status: 'Resolved',
        inspectionOutcome: 'Restock',
      })
      .subscribe(() => this.reload());
  }

  processRefund(): void {
    const order = this.order();
    const request = this.returns()[0];

    if (!order || !request || request.status !== 'Resolved') {
      return;
    }

    const previousRefunds = this.refunds()
      .filter((item) => item.status === 'Processed')
      .reduce((sum, item) => sum + item.amount, 0);

    const remainingRefundable = order.grandTotal - previousRefunds;
    const amount = request.amount;

    if (amount > remainingRefundable) {
      return;
    }

    this.refundService
      .create({
        orderId: order.id,
        returnId: request.id,
        status: 'Processed',
        amount,
        reason: request.reason,
        createdAt: new Date().toISOString(),
      })
      .subscribe(() => {
        const totalRefunded = previousRefunds + amount;
        const paymentStatus =
          totalRefunded >= order.grandTotal
            ? 'Refunded'
            : 'Partially Refunded';

        this.orders
          .transition(
            order,
            { paymentStatus },
            `Refund processed: $${amount.toFixed(2)}`,
          )
          .subscribe(() => this.reload());
      });
  }

  private transitionToPicking(order: Order): void {
    this.orders
      .transition(
        order,
        {
          status: 'Processing',
          fulfillmentStatus: 'Picking',
        },
        'Fulfillment started',
      )
      .subscribe(() => this.reload());
  }

  private reload(): void {
    this.orders.get(this.id).subscribe((value) => {
      this.order.set(value);
    });

    this.orders.activities(this.id).subscribe((value) => {
      this.activity.set(value.slice().reverse());
    });

    this.fulfillmentService.list({ orderId: this.id }).subscribe((value) => {
      this.fulfillment.set(value[0] ?? null);
    });

    this.shipmentService.list({ orderId: this.id }).subscribe((value) => {
      this.shipment.set(value[0] ?? null);
    });

    this.returnService.list({ orderId: this.id }).subscribe((value) => {
      this.returns.set(value);
    });

    this.refundService.list({ orderId: this.id }).subscribe((value) => {
      this.refunds.set(value);
    });
  }
}
