import { Order } from '../models/domain.models';
import {
  availableRefundAmount,
  canCreateShipment,
  isPercentageDiscountValid,
  isPromotionDateRangeValid,
} from './commerce-rules';

describe('commerce rules', () => {
  it('prevents refunding more than the remaining paid amount', () => {
    const order = { grandTotal: 500 } as Order;

    expect(availableRefundAmount(order, 125)).toBe(375);
  });

  it('requires at least one packed item before shipment', () => {
    expect(canCreateShipment(0)).toBeFalse();
    expect(canCreateShipment(1)).toBeTrue();
  });

  it('validates percentage discounts', () => {
    expect(isPercentageDiscountValid(20)).toBeTrue();
    expect(isPercentageDiscountValid(120)).toBeFalse();
  });

  it('requires promotion end date after start date', () => {
    expect(
      isPromotionDateRangeValid({
        startDate: '2026-08-01',
        endDate: '2026-08-31',
      }),
    ).toBeTrue();
  });
});
