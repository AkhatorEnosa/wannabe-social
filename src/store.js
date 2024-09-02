import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../src/reducers/userSlice'
import postReducer from '../src/reducers/PostSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer
    }
})