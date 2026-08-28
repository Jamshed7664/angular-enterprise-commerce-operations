import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Product } from '../../../core/models/domain.models';
import { CatalogService } from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './pricing.component.html',
})
export class PricingComponent implements OnInit {
  private readonly service = inject(CatalogService);
  readonly products = signal<Product[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.products.set(items);
    });
  }
}
