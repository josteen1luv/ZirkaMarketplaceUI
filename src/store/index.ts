import { configureStore } from '@reduxjs/toolkit';
import { productApiSlice } from '../api/product/productApiSlice.ts';
import user from '../api/user/userSlice.ts';
import theme from '../api/theme/themeSlice.ts';
import cart from '../api/cart/cartSlice.ts';
const index = configureStore({
    reducer: {
        [productApiSlice.reducerPath]: productApiSlice.reducer,
        theme,
        user,
        cart,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApiSlice.middleware),
});

export default index;

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
