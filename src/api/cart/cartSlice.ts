import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { cartApi } from './cartApiSlice.ts';

export type PurchaseItemDtos = {
    userId: string;
    productId: string;
    quantity: number;
    price: number;
};

export interface CartState {
    purchaseItemDtos: PurchaseItemDtos[];
    currency: 'pln';
    description: string;
    paymentMethodId: 'pm_card_visa';
}
const initialState: CartState = {
    purchaseItemDtos: [],
    currency: 'pln',
    description: 'string',
    paymentMethodId: 'pm_card_visa',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.purchaseItemDtos.push(action.payload);
        },
        changeQuantity: (state, action) => {
            state.purchaseItemDtos = state.purchaseItemDtos.map((item) =>
                item.productId === action.payload.productId
                    ? {
                          ...item,
                          quantity: action.payload.quantity,
                          price: action.payload.price,
                      }
                    : item,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            cartApi.endpoints.payment.matchFulfilled,
            (state) => {
                state.purchaseItemDtos = [];
            },
        );
    },
});

export const { addProduct, changeQuantity } = cartSlice.actions;

export const selectPaymentInfo = (state: RootState) => state.cart;

export default cartSlice.reducer;
