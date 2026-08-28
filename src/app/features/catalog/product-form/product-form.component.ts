import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../../../core/services/commerce.services';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, PageHeaderComponent],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly catalog = inject(CatalogService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    readonly id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    readonly categories = signal<{
        id: number;
        name: string;
    }[]>([]);
    readonly existingSkus = signal<string[]>([]);
    readonly form = this.fb.nonNullable.group({
        sku: ['', Validators.required],
        title: ['', Validators.required],
        brand: ['', Validators.required],
        shortDescription: ['', Validators.required],
        description: [''],
        categoryId: [1, Validators.required],
        basePrice: [0, [Validators.required, Validators.min(0.01)]],
        compareAtPrice: [0, Validators.min(0)],
        cost: [0, Validators.min(0)],
        status: ['Active' as 'Draft' | 'Active' | 'Archived'],
        imageUrl: ['/assets/images/products/product-placeholder.svg'],
        variants: this.fb.array([this.variantGroup()]),
    });
    get variants(): FormArray { return this.form.controls.variants; }
    ngOnInit(): void {
        this.catalog.categories().subscribe((items) => this.categories.set(items));
        this.catalog.list().subscribe((items) => {
            this.existingSkus.set(items.filter((item) => item.id !== this.id).flatMap((item) => [item.sku, ...item.variants.map((variant) => variant.sku)]));
        });
        if (this.id) {
            this.catalog.get(this.id).subscribe((product) => {
                this.variants.clear();
                product.variants.forEach((variant) => this.variants.push(this.variantGroup(variant)));
                this.form.patchValue(product);
            });
        }
    }
    addVariant(): void { this.variants.push(this.variantGroup()); }
    removeVariant(index: number): void {
        if (this.variants.length > 1)
            this.variants.removeAt(index);
    }
    save(): void {
        if (this.form.invalid)
            return;
        const value = this.form.getRawValue();
        const skus = [value.sku, ...value.variants.map((variant) => variant.sku)].filter(Boolean);
        if (skus.some((sku) => this.existingSkus().includes(sku))) {
            this.form.controls.sku.setErrors({ duplicate: true });
            return;
        }
        const payload = {
            ...value,
            collectionIds: [],
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const request = this.id ? this.catalog.update(this.id, payload) : this.catalog.create(payload);
        request.subscribe((product) => void this.router.navigate(['/catalog', product.id]));
    }
    private variantGroup(variant?: {
        id: number;
        sku: string;
        name: string;
        options: string;
        price: number;
        status: 'Active' | 'Inactive';
        inventory: number;
    }) {
        return this.fb.nonNullable.group({
            id: [variant?.id ?? Date.now()],
            sku: [variant?.sku ?? '', Validators.required],
            name: [variant?.name ?? 'Default'],
            options: [variant?.options ?? 'Default'],
            price: [variant?.price ?? 0, Validators.min(0)],
            status: [variant?.status ?? 'Active'],
            inventory: [variant?.inventory ?? 0, Validators.min(0)],
        });
    }
}

