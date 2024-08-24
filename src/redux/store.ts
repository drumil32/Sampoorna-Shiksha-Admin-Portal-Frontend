// src/redux/store.ts
import { configureStore, Store } from "@reduxjs/toolkit";
import statusReducer from "./slices/statusSlice";

const store: Store = configureStore({
    reducer: {
        status: statusReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
