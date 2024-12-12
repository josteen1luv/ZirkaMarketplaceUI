import { api } from '../api';
import { User } from '../../types/User.ts';
import { AuthResponse } from '../../types/AuthResponse.ts';
import { RegisterUser } from '../../pages/singUp/SingUp.tsx';

type UpdateUserValues = {
    id: string;
    credentials: User;
};
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            AuthResponse,
            { userName: string; password: string }
        >({
            query: (credentials) => ({
                url: '/users/login',
                method: 'post',
                data: credentials,
            }),
        }),
        registration: builder.mutation<AuthResponse, RegisterUser>({
            query: (credentials) => ({
                url: '/users/register',
                method: 'post',
                data: credentials,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/users/logout',
                method: 'post',
            }),
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: '/users',
                method: 'get',
            }),
            providesTags: ['User'],
        }),
        getUser: builder.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<User, UpdateUserValues>({
            query: ({ id, credentials }: UpdateUserValues) => ({
                url: `/users/${id}`,
                method: 'PUT',
                data: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        refresh: builder.query<AuthResponse, void>({
            query: (credentials) => ({
                url: '/users/refreshtoken',
                method: 'GET',
                data: credentials,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useRefreshQuery,
    useGetAllUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} = authApi;
