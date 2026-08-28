import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Refund } from '../../core/models/domain.models';
import { RefundService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-refunds',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    StatusChipComponent,
  ],
  templateUrl: './refunds.component.html',
})
export class RefundsComponent implements OnInit {
  private readonly service = inject(RefundService);
  readonly items = signal<Refund[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.items.set(items);
    });
  }
}
