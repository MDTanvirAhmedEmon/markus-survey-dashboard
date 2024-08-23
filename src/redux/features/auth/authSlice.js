import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const tokenData = action.payload;
            state.token = tokenData;
        },
        logOut: (state) => {
            state.token = null;
        }
    }
})

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;