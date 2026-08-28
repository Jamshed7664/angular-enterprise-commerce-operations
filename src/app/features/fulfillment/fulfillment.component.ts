import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Fulfillment } from '../../core/models/domain.models';
import { FulfillmentService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-fulfillment',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    StatusChipComponent,
  ],
  templateUrl: './fulfillment.component.html',
  styleUrl: './fulfillment.component.scss',
})
export class FulfillmentComponent implements OnInit {
  private readonly service = inject(FulfillmentService);
  readonly items = signal<Fulfillment[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.items.set(items);
    });
  }
}
