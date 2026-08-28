import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/domain.models';
import { CatalogService } from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ProductImageComponent } from '../../../shared/components/product-image/product-image.component';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';
@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterLink, PageHeaderComponent, ProductImageComponent, StatusChipComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
    private readonly catalog = inject(CatalogService);
    readonly products = signal<Product[]>([]);
    readonly search = signal('');
    readonly view = signal<'grid' | 'table'>('grid');
    readonly filtered = computed(() => {
        const term = this.search().trim().toLowerCase();
        return this.products().filter((product) => !term || `${product.title} ${product.sku} ${product.brand}`.toLowerCase().includes(term));
    });
    ngOnInit(): void {
        this.catalog.list().subscribe((items) => this.products.set(items));
    }
    updateSearch(event: Event): void {
        this.search.set((event.target as HTMLInputElement).value);
    }
}

