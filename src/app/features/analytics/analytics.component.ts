import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Order } from '../../core/models/domain.models';
import {
  AnalyticsService,
  OrderService,
} from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface StatusRow {
  status: string;
  count: number;
  percent: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  private readonly analytics = inject(AnalyticsService);
  private readonly ordersService = inject(OrderService);

  readonly snapshot = signal({
    gmv: 0,
    netSales: 0,
    aov: 0,
    orders: 0,
    returnRate: 0,
  });

  readonly orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.analytics.snapshot().subscribe((value) => {
      this.snapshot.set(value);
    });

    this.ordersService.list().subscribe((items) => {
      this.orders.set(items);
    });
  }

  statusRows(): StatusRow[] {
    const statuses = [
      'Draft',
      'Confirmed',
      'Processing',
      'Completed',
      'Cancelled',
    ];

    const total = Math.max(1, this.orders().length);

    return statuses.map((status) => {
      const count = this.orders().filter(
        (order) => order.status === status,
      ).length;

      return {
        status,
        count,
        percent: (count / total) * 100,
      };
    });
  }
}
