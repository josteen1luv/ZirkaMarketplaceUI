import { api } from '../api';
import { Shipping, UpdateShippingStatus } from '../../types/Shipping.ts';

export const shippingApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getShippingByBuyer: builder.query<Shipping[], string>({
            query: (userId) => ({
                url: `/purchase/buyer/${userId}`,
                method: 'get',
            }),
            providesTags: ['Shipping'],
        }),
        getShippingBySeller: builder.query<Shipping[], string>({
            query: (sellerId) => ({
                url: `/purchase/seller/${sellerId}`,
                method: 'get',
            }),
            providesTags: ['Shipping'],
        }),
        updateShippingStatus: builder.mutation<void, UpdateShippingStatus>({
            query: (params) => {
                const createParams = new URLSearchParams();
                createParams.append('purchaseId', params.purchaseId);
                createParams.append('status', params.status.toString());
                return {
                    url: `/purchase?${createParams.toString()}`,
                    method: 'patch',
                };
            },
            invalidatesTags: ['Shipping'],
        }),
    }),
});

export const {
    useGetShippingByBuyerQuery,
    useGetShippingBySellerQuery,
    useUpdateShippingStatusMutation,
} = shippingApiSlice;
