import { Component, inject, OnInit, signal } from '@angular/core';

import { Category } from '../../../core/models/domain.models';
import { CatalogService } from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly service = inject(CatalogService);
  readonly categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.service.categories().subscribe((items) => {
      this.categories.set(items);
    });
  }
}
