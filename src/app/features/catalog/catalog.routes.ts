import { Routes } from '@angular/router';
export const CATALOG_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./product-list/product-list.component').then((m) => m.ProductListComponent) },
    { path: 'categories', loadComponent: () => import('./master-data/categories.component').then((m) => m.CategoriesComponent) },
    { path: 'collections', loadComponent: () => import('./master-data/collections.component').then((m) => m.CollectionsComponent) },
    { path: 'pricing', loadComponent: () => import('./master-data/pricing.component').then((m) => m.PricingComponent) },
    { path: 'new', loadComponent: () => import('./product-form/product-form.component').then((m) => m.ProductFormComponent) },
    { path: ':id/edit', loadComponent: () => import('./product-form/product-form.component').then((m) => m.ProductFormComponent) },
    { path: ':id', loadComponent: () => import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent) },
];

