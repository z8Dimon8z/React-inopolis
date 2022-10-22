import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    user: {}
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setCredentials: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setIsAuth, setCredentials } = userSlice.actions;

export default userSlice.reducer;