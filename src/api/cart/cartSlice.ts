import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type PurchaseItemDtos = {
    productId: string;
    quantity: number;
};

interface InitialState {
    purchaseItemDtos: PurchaseItemDtos[];
    currency: 'pln';
    description: string;
    paymentMethodId: 'pm_card_visa';
}
const initialState: InitialState = {
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
        buyProducts: (state) => {
            state.purchaseItemDtos = [];
        },
    },
});

export const { addProduct, buyProducts } = cartSlice.actions;

export const selectPaymentInfo = (state: RootState) => state.cart;

export default cartSlice.reducer;
