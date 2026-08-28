import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

import {
  ActivityEntry,
  Category,
  Collection,
  Coupon,
  Customer,
  Fulfillment,
  Notification,
  Order,
  Product,
  Promotion,
  Refund,
  ReturnRequest,
  Review,
  Shipment,
  StoreSettings,
  User,
} from '../models/domain.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<Product[]> {
    return this.api.list<Product>('products', query);
  }

  get(id: number): Observable<Product> {
    return this.api.get<Product>('products', id);
  }

  create(payload: Partial<Product>): Observable<Product> {
    return this.api.create<Product>('products', payload);
  }

  update(id: number, payload: Partial<Product>): Observable<Product> {
    return this.api.update<Product>('products', id, payload);
  }

  categories(): Observable<Category[]> {
    return this.api.list<Category>('categories');
  }

  collections(): Observable<Collection[]> {
    return this.api.list<Collection>('collections');
  }
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<Customer[]> {
    return this.api.list<Customer>('customers', query);
  }

  get(id: number): Observable<Customer> {
    return this.api.get<Customer>('customers', id);
  }
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<Order[]> {
    return this.api.list<Order>('orders', query);
  }

  get(id: number): Observable<Order> {
    return this.api.get<Order>('orders', id);
  }

  create(payload: Partial<Order>): Observable<Order> {
    return this.api.create<Order>('orders', payload);
  }

  update(id: number, payload: Partial<Order>): Observable<Order> {
    return this.api.update<Order>('orders', id, payload);
  }

  activities(orderId: number): Observable<ActivityEntry[]> {
    return this.api.list<ActivityEntry>('activities', { orderId });
  }

  transition(
    order: Order,
    patch: Partial<Order>,
    message: string,
  ): Observable<Order> {
    return this.api
      .update<Order>('orders', order.id, {
        ...patch,
        updatedAt: new Date().toISOString(),
      })
      .pipe(
        switchMap((updated) =>
          this.api
            .create<ActivityEntry>('activities', {
              orderId: order.id,
              type: 'Order',
              message,
              createdAt: new Date().toISOString(),
            })
            .pipe(map(() => updated)),
        ),
      );
  }
}

@Injectable({ providedIn: 'root' })
export class FulfillmentService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<Fulfillment[]> {
    return this.api.list<Fulfillment>('fulfillments', query);
  }

  create(payload: Partial<Fulfillment>): Observable<Fulfillment> {
    return this.api.create<Fulfillment>('fulfillments', payload);
  }

  update(
    id: number,
    payload: Partial<Fulfillment>,
  ): Observable<Fulfillment> {
    return this.api.update<Fulfillment>('fulfillments', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<Shipment[]> {
    return this.api.list<Shipment>('shipments', query);
  }

  create(payload: Partial<Shipment>): Observable<Shipment> {
    return this.api.create<Shipment>('shipments', payload);
  }

  update(id: number, payload: Partial<Shipment>): Observable<Shipment> {
    return this.api.update<Shipment>('shipments', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class ReturnService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<ReturnRequest[]> {
    return this.api.list<ReturnRequest>('returns', query);
  }

  create(payload: Partial<ReturnRequest>): Observable<ReturnRequest> {
    return this.api.create<ReturnRequest>('returns', payload);
  }

  update(
    id: number,
    payload: Partial<ReturnRequest>,
  ): Observable<ReturnRequest> {
    return this.api.update<ReturnRequest>('returns', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class RefundService {
  private readonly api = inject(ApiService);

  list(
    query: Record<string, string | number> = {},
  ): Observable<Refund[]> {
    return this.api.list<Refund>('refunds', query);
  }

  create(payload: Partial<Refund>): Observable<Refund> {
    return this.api.create<Refund>('refunds', payload);
  }

  update(id: number, payload: Partial<Refund>): Observable<Refund> {
    return this.api.update<Refund>('refunds', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private readonly api = inject(ApiService);

  coupons(): Observable<Coupon[]> {
    return this.api.list<Coupon>('coupons');
  }

  createCoupon(payload: Partial<Coupon>): Observable<Coupon> {
    return this.api.create<Coupon>('coupons', payload);
  }

  promotions(): Observable<Promotion[]> {
    return this.api.list<Promotion>('promotions');
  }

  createPromotion(payload: Partial<Promotion>): Observable<Promotion> {
    return this.api.create<Promotion>('promotions', payload);
  }

  updatePromotion(
    id: number,
    payload: Partial<Promotion>,
  ): Observable<Promotion> {
    return this.api.update<Promotion>('promotions', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly api = inject(ApiService);

  list(): Observable<Review[]> {
    return this.api.list<Review>('reviews');
  }

  update(id: number, payload: Partial<Review>): Observable<Review> {
    return this.api.update<Review>('reviews', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly api = inject(ApiService);

  list(userId = 1): Observable<Notification[]> {
    return this.api.list<Notification>('notifications', { userId });
  }

  update(
    id: number,
    payload: Partial<Notification>,
  ): Observable<Notification> {
    return this.api.update<Notification>('notifications', id, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly api = inject(ApiService);

  get(): Observable<StoreSettings> {
    return this.api.get<StoreSettings>('storeSettings', 1);
  }

  update(payload: Partial<StoreSettings>): Observable<StoreSettings> {
    return this.api.update<StoreSettings>('storeSettings', 1, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class AdministrationService {
  private readonly api = inject(ApiService);

  users(): Observable<User[]> {
    return this.api.list<User>('users');
  }

  auditLogs(): Observable<
    { id: number; event: string; createdAt: string }[]
  > {
    return this.api.list<
      { id: number; event: string; createdAt: string }
    >('auditLogs');
  }
}

export interface CommerceSearchResult {
  type: 'Order' | 'Product' | 'Customer';
  id: number;
  title: string;
  subtitle: string;
  route: string;
}

@Injectable({ providedIn: 'root' })
export class CommerceSearchService {
  private readonly api = inject(ApiService);

  search(query: string): Observable<CommerceSearchResult[]> {
    const term = query.trim().toLowerCase();

    if (term.length < 2) {
      return of([]);
    }

    return forkJoin({
      orders: this.api.list<Order>('orders'),
      products: this.api.list<Product>('products'),
      customers: this.api.list<Customer>('customers'),
    }).pipe(
      map(({ orders, products, customers }) => {
        const orderResults: CommerceSearchResult[] = orders
          .filter((order) =>
            order.orderNumber.toLowerCase().includes(term),
          )
          .map((order) => ({
            type: 'Order',
            id: order.id,
            title: order.orderNumber,
            subtitle: `${order.paymentStatus} · ${order.fulfillmentStatus}`,
            route: `/orders/${order.id}`,
          }));

        const productResults: CommerceSearchResult[] = products
          .filter((product) =>
            `${product.sku} ${product.title}`
              .toLowerCase()
              .includes(term),
          )
          .map((product) => ({
            type: 'Product',
            id: product.id,
            title: product.title,
            subtitle: product.sku,
            route: `/catalog/${product.id}`,
          }));

        const customerResults: CommerceSearchResult[] = customers
          .filter((customer) =>
            `${customer.name} ${customer.email}`
              .toLowerCase()
              .includes(term),
          )
          .map((customer) => ({
            type: 'Customer',
            id: customer.id,
            title: customer.name,
            subtitle: customer.email,
            route: `/customers/${customer.id}`,
          }));

        return [
          ...orderResults,
          ...productResults,
          ...customerResults,
        ].slice(0, 8);
      }),
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly orders = inject(OrderService);
  private readonly returns = inject(ReturnService);

  snapshot(): Observable<{
    gmv: number;
    netSales: number;
    aov: number;
    orders: number;
    returnRate: number;
  }> {
    return forkJoin({
      orders: this.orders.list(),
      returns: this.returns.list(),
    }).pipe(
      map(({ orders, returns }) => {
        const completed = orders.filter(
          (order) => order.status !== 'Cancelled',
        );

        const gmv = completed.reduce(
          (sum, order) => sum + order.grandTotal,
          0,
        );

        const refunded = completed
          .filter((order) => order.paymentStatus === 'Refunded')
          .reduce((sum, order) => sum + order.grandTotal, 0);

        return {
          gmv,
          netSales: gmv - refunded,
          aov: completed.length ? gmv / completed.length : 0,
          orders: orders.length,
          returnRate: orders.length
            ? (returns.length / orders.length) * 100
            : 0,
        };
      }),
    );
  }
}
