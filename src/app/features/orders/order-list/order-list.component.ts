import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Order } from '../../../core/models/domain.models';
import { OrderService } from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    StatusChipComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  private readonly service = inject(OrderService);

  readonly orders = signal<Order[]>([]);
  readonly search = signal('');
  readonly status = signal('All');

  readonly filtered = computed(() => {
    const query = this.search().toLowerCase();

    return this.orders().filter((order) => {
      const matchesStatus =
        this.status() === 'All' || order.status === this.status();
      const matchesSearch =
        !query || order.orderNumber.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.orders.set(items);
    });
  }

  updateSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }
}
