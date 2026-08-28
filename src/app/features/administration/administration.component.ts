import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { User } from '../../core/models/domain.models';
import { AdministrationService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface AuditLog {
  id: number;
  event: string;
  createdAt: string;
}

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss',
})
export class AdministrationComponent implements OnInit {
  private readonly service = inject(AdministrationService);

  readonly users = signal<User[]>([]);
  readonly logs = signal<AuditLog[]>([]);

  readonly permissionRows = [
    'Catalog',
    'Customers',
    'Orders',
    'Fulfillment',
    'Returns',
    'Promotions',
    'Analytics',
  ];

  ngOnInit(): void {
    this.service.users().subscribe((items) => {
      this.users.set(items);
    });

    this.service.auditLogs().subscribe((items) => {
      this.logs.set(items);
    });
  }
}
