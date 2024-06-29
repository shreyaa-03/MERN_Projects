import { createSlice } from "@reduxjs/toolkit";

const authPageSlice = createSlice({
    name: 'page',
    initialState: { currentPage: 'login'},
    reducers: {
        showLoginPage: (state) => {
            state.currentPage = 'login'
        }, 
        showRegisterPage: (state) => {
            state.currentPage = 'register'
        }
    }
})

export const authPageActions = authPageSlice.actions
export default authPageSlice