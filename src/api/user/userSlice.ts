import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApiSlice';
import { RootState } from '../../store';

interface InitialState {
    id: string | null;
    isAuth: boolean;
    role: 0 | 1 | 2 | null;
}
const initialState: InitialState = {
    id: null,
    isAuth: false,
    role: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.id = action.payload.userId;
                    if (action.payload.role === 'Buyer') {
                        state.role = 2;
                    } else if (action.payload.role === 'Seller') {
                        state.role = 1;
                    } else {
                        state.role = 0;
                    }

                    state.isAuth = true;
                    // localStorage.setItem('token', action.payload.accessToken);
                },
            )
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.id = null;
                state.role = null;
                state.isAuth = false;
                // localStorage.removeItem('token');
            })
            .addMatcher(
                authApi.endpoints.refresh.matchFulfilled,
                (state, action) => {
                    state.id = action.payload.userId;
                    state.isAuth = true;
                    if (action.payload.role === 'Buyer') {
                        state.role = 2;
                    } else if (action.payload.role === 'Seller') {
                        state.role = 1;
                    } else {
                        state.role = 0;
                    }
                    localStorage.setItem('token', action.payload.accessToken);
                },
            );
    },
});
export const selectId = (state: RootState) => state.user.id;
export const selectRole = (state: RootState) => state.user.role;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export default userSlice.reducer;
