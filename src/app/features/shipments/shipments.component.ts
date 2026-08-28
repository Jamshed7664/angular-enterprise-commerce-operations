import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Shipment } from '../../core/models/domain.models';
import { ShipmentService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    StatusChipComponent,
  ],
  templateUrl: './shipments.component.html',
})
export class ShipmentsComponent implements OnInit {
  private readonly service = inject(ShipmentService);
  readonly items = signal<Shipment[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.items.set(items);
    });
  }
}
