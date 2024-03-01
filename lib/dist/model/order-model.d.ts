export interface OrderItem {
    id?: string;
    orderId?: string;
    storeId?: string;
    storeUserId?: string;
    storeName?: string;
    storePhone?: string;
    productId?: string;
    productName?: string;
    productPicture?: string;
    productPrice?: number;
    productUnit?: string;
    productVariantId?: string;
    productVariantName?: string;
    productVariantPrice?: number;
    productVariantUnit?: string;
    wholesaleMin?: number;
    wholesalePrice?: number;
    qty?: number;
    total?: number;
    instant?: boolean;
    shippingId?: string;
    shippingName?: string;
    shippingFee?: number;
    weight?: number;
    created?: string;
    update?: string;
    shippingStatus?: ShippingStatus[];
    order?: OrderModel;
}
export interface OrderStatus {
    id?: string;
    orderId?: string;
    status?: string;
    note?: string;
    created?: string;
    updated?: string;
    order?: OrderModel;
}
export interface PaymentStatus {
    id?: string;
    orderId?: string;
    status?: string;
    note?: string;
    created?: string;
    updated?: string;
    order?: OrderModel;
}
export interface ShippingStatus {
    id?: string;
    orderId?: string;
    orderItemId?: string;
    status?: string;
    note?: string;
    created?: string;
    updated?: string;
    orderItem?: OrderItem;
    order?: OrderModel;
}
export interface OrderModel {
    id?: string;
    invoice?: string;
    userId?: string;
    userName?: string;
    userPhone?: string;
    storeId?: string;
    storeUserId?: string;
    storeName?: string;
    storePhone?: string;
    paymentId?: string;
    paymentName?: string;
    paymentPicture?: string;
    paymentFee?: number;
    paymentFixed?: boolean;
    adminFee?: number;
    receiverName?: string;
    receiverAddress?: string;
    receiverPhone?: string;
    receiverLat?: string;
    receiverLng?: string;
    statusOrder?: string;
    statusPayment?: string;
    statusShipping?: string;
    productQty?: number;
    productTotal?: number;
    created?: string;
    updated?: string;
    orderItem?: OrderItem[];
    orderStatus?: OrderStatus[];
    paymentStatus?: PaymentStatus[];
}
//# sourceMappingURL=order-model.d.ts.map