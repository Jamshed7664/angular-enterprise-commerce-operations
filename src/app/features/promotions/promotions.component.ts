import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Coupon, Promotion } from '../../core/models/domain.models';
import { PromotionService } from '../../core/services/commerce.services';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit {
  private readonly service = inject(PromotionService);
  private readonly fb = inject(FormBuilder);

  readonly coupons = signal<Coupon[]>([]);
  readonly promotions = signal<Promotion[]>([]);
  readonly promotionFormOpen = signal(false);
  readonly couponFormOpen = signal(false);

  readonly promotionForm = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      active: [true],
    },
    { validators: [this.dateRangeValidator] },
  );

  readonly couponForm = this.fb.nonNullable.group(
    {
      code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9_-]+$/)]],
      description: ['', Validators.required],
      type: ['Percentage' as 'Percentage' | 'Fixed'],
      value: [10, [Validators.required, Validators.min(0.01)]],
      minimumOrderValue: [0, Validators.min(0)],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      usageLimit: [100, [Validators.required, Validators.min(1)]],
    },
    { validators: [this.dateRangeValidator, this.discountValidator] },
  );

  ngOnInit(): void {
    this.reload();
  }

  createPromotion(): void {
    if (this.promotionForm.invalid) {
      return;
    }

    this.service
      .createPromotion({
        ...this.promotionForm.getRawValue(),
        categoryIds: [],
        productIds: [],
        revenue: 0,
      })
      .subscribe(() => {
        this.promotionForm.reset({ active: true });
        this.promotionFormOpen.set(false);
        this.reload();
      });
  }

  createCoupon(): void {
    if (this.couponForm.invalid) {
      return;
    }

    const value = this.couponForm.getRawValue();

    this.service
      .createCoupon({
        ...value,
        code: value.code.toUpperCase(),
        usedCount: 0,
        active: true,
      })
      .subscribe(() => {
        this.couponForm.reset({
          type: 'Percentage',
          value: 10,
          minimumOrderValue: 0,
          usageLimit: 100,
        });
        this.couponFormOpen.set(false);
        this.reload();
      });
  }

  private reload(): void {
    this.service.coupons().subscribe((items) => {
      this.coupons.set(items);
    });

    this.service.promotions().subscribe((items) => {
      this.promotions.set(items);
    });
  }

  private dateRangeValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const startDate = control.get('startDate')?.value as string | undefined;
    const endDate = control.get('endDate')?.value as string | undefined;

    if (!startDate || !endDate) {
      return null;
    }

    return new Date(endDate).getTime() > new Date(startDate).getTime()
      ? null
      : { dateRange: true };
  }

  private discountValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const type = control.get('type')?.value as string | undefined;
    const value = Number(control.get('value')?.value ?? 0);

    if (type === 'Percentage' && value > 100) {
      return { discountRange: true };
    }

    return null;
  }
}
