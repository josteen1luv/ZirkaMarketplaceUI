import { api } from '../api';
import { Category } from '../../types/Category.ts';

export const categoryApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: '/categories',
                method: 'get',
            }),
            providesTags: ['Category'],
        }),
        getSingleCategory: builder.query<Category, string>({
            query: (id: string) => ({
                url: `/categories/${id}`,
                method: 'get',
            }),
            providesTags: ['Category'],
        }),
        postCategory: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: '/categories',
                method: 'post',
                data: formData,
                headers: {
                    'Skip-Content-Type': true,
                },
                formData: true,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    usePostCategoryMutation,
} = categoryApiSlice;
