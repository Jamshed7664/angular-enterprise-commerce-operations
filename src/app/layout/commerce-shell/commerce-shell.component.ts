import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import {
  CommerceSearchResult,
  CommerceSearchService,
  NotificationService,
} from '../../core/services/commerce.services';
import { Notification } from '../../core/models/domain.models';
@Component({
    selector: 'app-commerce-shell',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './commerce-shell.component.html',
    styleUrl: './commerce-shell.component.scss',
})
export class CommerceShellComponent implements OnInit {
    readonly auth = inject(AuthService);
    readonly theme = inject(ThemeService);
    private readonly notificationService = inject(NotificationService);
  private readonly searchService = inject(CommerceSearchService);
    readonly railExpanded = signal(true);
    readonly notificationsOpen = signal(false);
    readonly profileOpen = signal(false);
    readonly notifications = signal<Notification[]>([]);
  readonly searchQuery = signal('');
  readonly searchResults = signal<CommerceSearchResult[]>([]);
  readonly searchOpen = signal(false);
    readonly unreadCount = computed(() => this.notifications().filter((item) => !item.read).length);
    readonly initials = computed(() => (this.auth.user()?.name ?? 'User')
        .split(' ')
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase());
    readonly nav = [
        { label: 'Command Center', path: '/command-center', icon: 'fa-solid fa-bolt' },
        { label: 'Catalog', path: '/catalog', icon: 'fa-solid fa-boxes-stacked' },
        { label: 'Customers', path: '/customers', icon: 'fa-solid fa-users' },
        { label: 'Orders', path: '/orders', icon: 'fa-solid fa-receipt' },
        { label: 'Fulfillment', path: '/fulfillment', icon: 'fa-solid fa-box-open' },
        { label: 'Shipments', path: '/shipments', icon: 'fa-solid fa-truck-fast' },
        { label: 'Returns', path: '/returns', icon: 'fa-solid fa-rotate-left' },
        { label: 'Refunds', path: '/refunds', icon: 'fa-solid fa-money-bill-transfer' },
        { label: 'Promotions', path: '/promotions', icon: 'fa-solid fa-tags' },
        { label: 'Reviews', path: '/reviews', icon: 'fa-solid fa-star-half-stroke' },
        { label: 'Analytics', path: '/analytics', icon: 'fa-solid fa-chart-line' },
        { label: 'Notifications', path: '/notifications', icon: 'fa-regular fa-bell' },
        { label: 'Administration', path: '/administration', icon: 'fa-solid fa-shield-halved' },
        { label: 'Settings', path: '/settings', icon: 'fa-solid fa-sliders' },
    ];
    ngOnInit(): void {
        this.notificationService.list().subscribe((items) => this.notifications.set(items));
    }
  
  search(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);

    if (query.trim().length < 2) {
      this.searchResults.set([]);
      this.searchOpen.set(false);
      return;
    }

    this.searchService.search(query).subscribe((results) => {
      this.searchResults.set(results);
      this.searchOpen.set(true);
    });
  }

  closeSearch(): void {
    this.searchOpen.set(false);
  }

  toggleContextNav(): void {
        this.railExpanded.update((value) => !value);
    }
    toggleNotifications(): void {
        this.notificationsOpen.update((value) => !value);
        this.profileOpen.set(false);
    }
    toggleProfile(): void {
        this.profileOpen.update((value) => !value);
        this.notificationsOpen.set(false);
    }
    markRead(item: Notification): void {
        if (item.read)
            return;
        this.notificationService.update(item.id, { read: true }).subscribe((updated) => this.notifications.update((items) => items.map((current) => (current.id === updated.id ? updated : current))));
    }
}

