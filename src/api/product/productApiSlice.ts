import { api } from '../api';
import { Product, RateProduct } from '../../types/Product.ts';
type SearchQuery = {
    name?: string;
};
export const productApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<{ items: Product[] }, SearchQuery>({
            query: (query) => ({
                url: `/products?Name=${query.name}`,
                method: 'get',
            }),
            providesTags: ['Product'],
        }),
        getMyProducts: builder.query<{ items: Product[] }, void>({
            query: () => ({
                url: '/products?pageNumber=1&pageSize=10000',
                method: 'get',
            }),
            providesTags: ['Product'],
        }),
        getSingleProduct: builder.query<Product, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'get',
            }),
            providesTags: ['Product'],
        }),
        getNewProducts: builder.query<Product[], void>({
            query: () => ({
                url: '/products/new-products',
                method: 'get',
            }),
            providesTags: ['Product'],
        }),
        getBestSellers: builder.query<Product[], void>({
            query: () => ({
                url: '/products/bestsellers',
                method: 'get',
            }),
            providesTags: ['Product'],
        }),
        postProduct: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: '/products',
                method: 'post',
                data: formData,
                headers: {
                    'Skip-Content-Type': true,
                },
                formData: true,
            }),
            invalidatesTags: ['Product'],
        }),
        rateProduct: builder.mutation<void, RateProduct>({
            query: (params) => {
                const createParams = new URLSearchParams();
                createParams.append('productId', params.productId);
                createParams.append('rating', params.rating.toString());
                return {
                    url: `/products?${createParams.toString()}`,
                    method: 'patch',
                };
            },
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetMyProductsQuery,
    useGetSingleProductQuery,
    usePostProductMutation,
    useGetBestSellersQuery,
    useGetNewProductsQuery,
    useRateProductMutation,
} = productApiSlice;
