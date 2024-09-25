import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  accounts: Array<string>;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

const initialState: UserState = {
  token: "",
  email: "",
  firstName: "",
  lastName: "",
  accounts: [],
  transactions: [],
  createdAt: "",
  updatedAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    saveUserData: (state, action: PayloadAction<any>) => {
      state.email = action.payload.data.email;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.accounts = action.payload.data.accounts;
      state.transactions = action.payload.data.transactions;
      state.createdAt = action.payload.data.createdAt;
      state.updatedAt = action.payload.data.updatedAt;
    }
  },
});

export const { saveToken, saveUserData } = userSlice.actions;

export default userSlice.reducer;
