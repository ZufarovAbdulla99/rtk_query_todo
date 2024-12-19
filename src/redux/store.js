import { configureStore } from "@reduxjs/toolkit";
import { todosApiSlice } from "./todosApiSlice";

export const store = configureStore({
    reducer: {
        [todosApiSlice.reducerPath]: todosApiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(todosApiSlice.middleware),
})