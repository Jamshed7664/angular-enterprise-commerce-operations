import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-product-image',
  standalone: true,
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.scss',
})
export class ProductImageComponent {
  @Input({ required: true })
  src = '';

  @Input()
  alt = 'Product image';

  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  readonly failed = signal(false);

  onError(): void {
    this.failed.set(true);
  }
}
