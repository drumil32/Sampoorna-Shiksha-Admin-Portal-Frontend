// src/redux/store.ts
import { configureStore, Store } from "@reduxjs/toolkit";
import statusReducer from "./slices/statusSlice";

import cartReducer from './slices/homeCartSlice'

const store: Store = configureStore({
    reducer: {
        status: statusReducer,
        cart : cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
