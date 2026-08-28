import { Component, inject, OnInit, signal } from '@angular/core';

import { Collection } from '../../../core/models/domain.models';
import { CatalogService } from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit {
  private readonly catalog = inject(CatalogService);
  readonly collections = signal<Collection[]>([]);

  ngOnInit(): void {
    this.catalog.collections().subscribe((items) => {
      this.collections.set(items);
    });
  }
}
