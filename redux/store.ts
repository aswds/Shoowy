import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    user_state: userReducer,
    user_history: "",
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
