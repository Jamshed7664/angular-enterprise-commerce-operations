import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../core/models/domain.models';
import { CatalogService } from '../../../core/services/commerce.services';
import { ProductImageComponent } from '../../../shared/components/product-image/product-image.component';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';
@Component({
    selector: 'app-product-details', standalone: true, imports: [CommonModule, RouterLink, ProductImageComponent, StatusChipComponent],
    templateUrl: './product-details.component.html', styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    private readonly catalog = inject(CatalogService);
    private readonly route = inject(ActivatedRoute);
    readonly product = signal<Product | null>(null);
    ngOnInit(): void { this.catalog.get(Number(this.route.snapshot.paramMap.get('id'))).subscribe((item) => this.product.set(item)); }
}

