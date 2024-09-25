import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import accountReducer from "../features/account/accountDataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accountData: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
