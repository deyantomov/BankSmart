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
  },
});

export const { saveAccountData } = accountDataSlice.actions;

export default accountDataSlice.reducer;
