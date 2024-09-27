import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import userReducer from "../features/user/userSlice";
import accountReducer from "../features/account/accountDataSlice";
import transactionReducer from "../features/transaction/transactionDataSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "accountData"],
};

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  accountData: accountReducer,
  transactionData: transactionReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);