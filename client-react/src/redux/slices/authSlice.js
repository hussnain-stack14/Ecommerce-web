import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: typeof window !== 'undefined' && localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            }
        },
        logout: (state, action) => {
            state.userInfo = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userInfo');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
