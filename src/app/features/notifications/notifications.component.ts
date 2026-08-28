import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Notification } from '../../core/models/domain.models';
import { NotificationService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  private readonly service = inject(NotificationService);
  readonly items = signal<Notification[]>([]);

  ngOnInit(): void {
    this.service.list().subscribe((items) => {
      this.items.set(items);
    });
  }

  read(notification: Notification): void {
    if (notification.read) {
      return;
    }

    this.service
      .update(notification.id, { read: true })
      .subscribe((updated) => {
        this.items.update((items) =>
          items.map((item) =>
            item.id === updated.id ? updated : item,
          ),
        );
      });
  }
}
