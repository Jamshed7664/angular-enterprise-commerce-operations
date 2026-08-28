export type ThemeMode = 'light' | 'dark' | 'system';
export type ProductStatus = 'Draft' | 'Active' | 'Archived';
export type OrderStatus = 'Draft' | 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Authorized' | 'Paid' | 'Partially Refunded' | 'Refunded' | 'Failed';
export type FulfillmentStatus = 'Unfulfilled' | 'Picking' | 'Packed' | 'Partially Fulfilled' | 'Fulfilled';
export type ShipmentStatus = 'Pending' | 'Ready to Ship' | 'Shipped' | 'In Transit' | 'Delivered' | 'Failed';
export type ReturnStatus = 'Requested' | 'Approved' | 'Received' | 'Inspected' | 'Resolved' | 'Rejected';
export type RefundStatus = 'Pending' | 'Approved' | 'Processed' | 'Rejected';
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
}
export interface ProductVariant {
    id: number;
    sku: string;
    name: string;
    options: string;
    price: number;
    status: 'Active' | 'Inactive';
    inventory: number;
}
export interface Product {
    id: number;
    sku: string;
    title: string;
    shortDescription: string;
    description: string;
    categoryId: number;
    collectionIds: number[];
    brand: string;
    tags: string[];
    status: ProductStatus;
    basePrice: number;
    compareAtPrice?: number;
    cost: number;
    imageUrl: string;
    variants: ProductVariant[];
    createdAt: string;
    updatedAt: string;
}
export interface Category {
    id: number;
    name: string;
    parentId?: number | null;
    status: 'Active' | 'Inactive';
}
export interface Collection {
    id: number;
    name: string;
    featured: boolean;
    productIds: number[];
}
export interface Address {
    id: number;
    label: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'Active' | 'Blocked';
    customerSince: string;
    lifetimeValue: number;
    totalOrders: number;
    averageOrderValue: number;
    lastOrderAt: string;
    addresses: Address[];
    notes: string;
    avatarUrl?: string;
}
export interface OrderLine {
    id: number;
    productId: number;
    variantId?: number;
    sku: string;
    title: string;
    imageUrl: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    fulfilledQuantity: number;
    returnedQuantity: number;
}
export interface Order {
    id: number;
    orderNumber: string;
    customerId: number;
    createdAt: string;
    updatedAt: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    fulfillmentStatus: FulfillmentStatus;
    shipmentStatus: ShipmentStatus;
    subtotal: number;
    shippingFee: number;
    discountTotal: number;
    taxTotal: number;
    grandTotal: number;
    billingAddress: Address;
    shippingAddress: Address;
    lines: OrderLine[];
    internalNotes: string;
    customerNote: string;
    tags: string[];
}
export interface Fulfillment {
    id: number;
    orderId: number;
    status: FulfillmentStatus;
    warehouse: string;
    pickedAt?: string;
    packedAt?: string;
    packageCount: number;
    notes: string;
    createdAt: string;
}
export interface Shipment {
    id: number;
    orderId: number;
    fulfillmentId: number;
    carrier: string;
    serviceLevel: string;
    trackingNumber: string;
    status: ShipmentStatus;
    shipDate?: string;
    estimatedDelivery?: string;
    deliveredDate?: string;
}
export interface ReturnRequest {
    id: number;
    orderId: number;
    status: ReturnStatus;
    reason: string;
    customerComment: string;
    resolution: 'Refund' | 'Replacement' | 'Store Credit';
    inspectionOutcome?: 'Restock' | 'Damaged' | 'Reject';
    amount: number;
    createdAt: string;
}
export interface Refund {
    id: number;
    orderId: number;
    returnId?: number;
    status: RefundStatus;
    amount: number;
    reason: string;
    createdAt: string;
}
export interface Coupon {
    id: number;
    code: string;
    description: string;
    type: 'Percentage' | 'Fixed';
    value: number;
    minimumOrderValue: number;
    startDate: string;
    endDate: string;
    usageLimit: number;
    usedCount: number;
    active: boolean;
}
export interface Promotion {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    active: boolean;
    categoryIds: number[];
    productIds: number[];
    revenue: number;
}
export interface Review {
    id: number;
    productId: number;
    customerId: number;
    rating: number;
    text: string;
    submittedAt: string;
    status: 'Pending' | 'Published' | 'Hidden' | 'Flagged';
}
export interface Notification {
    id: number;
    userId: number;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}
export interface ActivityEntry {
    id: number;
    orderId: number;
    type: string;
    message: string;
    createdAt: string;
}
export interface StoreSettings {
    id: number;
    storeName: string;
    currency: string;
    orderPrefix: string;
    shippingMethods: string[];
    theme: ThemeMode;
    notificationsEnabled: boolean;
}

