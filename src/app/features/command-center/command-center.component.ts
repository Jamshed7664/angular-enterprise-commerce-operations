import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService, FulfillmentService, OrderService, ReturnService } from '../../core/services/commerce.services';
import { Order } from '../../core/models/domain.models';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
@Component({
    selector: 'app-command-center',
    standalone: true,
    imports: [CommonModule, RouterLink, PageHeaderComponent, StatusChipComponent],
    templateUrl: './command-center.component.html',
    styleUrl: './command-center.component.scss',
})
export class CommandCenterComponent implements OnInit {
    private readonly analytics = inject(AnalyticsService);
    private readonly orderService = inject(OrderService);
  private readonly fulfillmentService = inject(FulfillmentService);
  private readonly returnService = inject(ReturnService);
    readonly snapshot = signal({ gmv: 0, netSales: 0, aov: 0, orders: 0, returnRate: 0 });
    readonly orders = signal<Order[]>([]);
  readonly pickingCount = signal(0);
  readonly returnCount = signal(0);
    ngOnInit(): void {
        this.analytics.snapshot().subscribe((value) => this.snapshot.set(value));
        this.orderService.list().subscribe((items) => this.orders.set(items.slice(0, 5)));
    this.fulfillmentService.list({ status: 'Picking' }).subscribe((items) => this.pickingCount.set(items.length));
    this.returnService.list().subscribe((items) => this.returnCount.set(items.filter((item) => item.status !== 'Resolved' && item.status !== 'Rejected').length));
    }
}

