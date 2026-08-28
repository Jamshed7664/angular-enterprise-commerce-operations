import { Order, Promotion } from '../models/domain.models';

export function availableRefundAmount(
  order: Order,
  processedRefundTotal: number,
): number {
  return Math.max(0, order.grandTotal - processedRefundTotal);
}

export function canCreateShipment(packedQuantity: number): boolean {
  return packedQuantity > 0;
}

export function isPercentageDiscountValid(value: number): boolean {
  return value > 0 && value <= 100;
}

export function isPromotionDateRangeValid(
  promotion: Pick<Promotion, 'startDate' | 'endDate'>,
): boolean {
  return (
    new Date(promotion.endDate).getTime() >
    new Date(promotion.startDate).getTime()
  );
}
