import { Component, inject, OnInit, signal } from '@angular/core';

import { Review } from '../../core/models/domain.models';
import { ReviewService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [PageHeaderComponent, StatusChipComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  private readonly service = inject(ReviewService);
  readonly reviews = signal<Review[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.reviews.set(items);
    });
  }

  setStatus(review: Review, status: Review['status']): void {
    this.service.update(review.id, { status }).subscribe((updated) => {
      this.reviews.update((items) =>
        items.map((item) => (item.id === updated.id ? updated : item)),
      );
    });
  }
}
