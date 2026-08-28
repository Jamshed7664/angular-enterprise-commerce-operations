import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReturnRequest } from '../../core/models/domain.models';
import { ReturnService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    StatusChipComponent,
  ],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.scss',
})
export class ReturnsComponent implements OnInit {
  private readonly service = inject(ReturnService);
  readonly items = signal<ReturnRequest[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.items.set(items);
    });
  }
}
