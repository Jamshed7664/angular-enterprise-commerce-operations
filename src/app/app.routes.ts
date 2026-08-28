import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { CommerceShellComponent } from './layout/commerce-shell/commerce-shell.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((module) => module.AUTH_ROUTES),
  },
  {
    path: '',
    component: CommerceShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'command-center',
        loadComponent: () =>
          import('./features/command-center/command-center.component').then(
            (module) => module.CommandCenterComponent,
          ),
      },
      {
        path: 'catalog',
        loadChildren: () =>
          import('./features/catalog/catalog.routes').then(
            (module) => module.CATALOG_ROUTES,
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customer.routes').then(
            (module) => module.CUSTOMER_ROUTES,
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/order.routes').then(
            (module) => module.ORDER_ROUTES,
          ),
      },
      {
        path: 'fulfillment',
        loadComponent: () =>
          import('./features/fulfillment/fulfillment.component').then(
            (module) => module.FulfillmentComponent,
          ),
      },
      {
        path: 'shipments',
        loadComponent: () =>
          import('./features/shipments/shipments.component').then(
            (module) => module.ShipmentsComponent,
          ),
      },
      {
        path: 'returns',
        loadComponent: () =>
          import('./features/returns/returns.component').then(
            (module) => module.ReturnsComponent,
          ),
      },
      {
        path: 'refunds',
        loadComponent: () =>
          import('./features/refunds/refunds.component').then(
            (module) => module.RefundsComponent,
          ),
      },
      {
        path: 'promotions',
        loadComponent: () =>
          import('./features/promotions/promotions.component').then(
            (module) => module.PromotionsComponent,
          ),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./features/reviews/reviews.component').then(
            (module) => module.ReviewsComponent,
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics.component').then(
            (module) => module.AnalyticsComponent,
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (module) => module.NotificationsComponent,
          ),
      },
      {
        path: 'administration',
        loadComponent: () =>
          import('./features/administration/administration.component').then(
            (module) => module.AdministrationComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then(
            (module) => module.SettingsComponent,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'command-center',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'command-center',
  },
];
