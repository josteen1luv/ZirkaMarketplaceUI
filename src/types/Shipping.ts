import { Product } from './Product.ts';

export type Shipping = {
    id: string;
    userId: string;
    sellerId: string;
    product: Product;
    quantity: number;
    status: 0 | 1 | 2;
};

export type UpdateShippingStatus = { purchaseId: string; status: number };
