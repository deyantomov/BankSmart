import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountData {
  accountId: string;
  holder: string;
  type: string;
  currency: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface AccountState {
  accounts: AccountData[];
}

const initialState: AccountState = {
  accounts: [],
};

export const accountDataSlice = createSlice({
  name: "accountData",
  initialState,
  reducers: {
    saveAccountData: (state, action: PayloadAction<AccountData>) => {
      state.accounts.push(action.payload);
    },
    saveUserAccounts: (state, action: PayloadAction<Array<AccountData>>) => {
      state.accounts = action.payload;
    },
    clearAccountData: (state) => {
      state.accounts = [];
    }
  },
});

export const { saveAccountData, saveUserAccounts, clearAccountData } = accountDataSlice.actions;

export default accountDataSlice.reducer;
