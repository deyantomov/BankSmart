import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionData {
  accountId?: string;
  senderId?: string;
  receiverId?: string;
  senderCurrency?: string;
  receiverCurrency?: string;
  originalAmount?: number;
  convertedAmount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionState {
  transactions: TransactionData[];
}

const initialState: TransactionState = {
  transactions: [],
};

export const transactionDataSlice = createSlice({
  name: "transactionData",
  initialState,
  reducers: {
    saveTransactionData: (state, action: PayloadAction<TransactionData>) => {
      state.transactions.push(action.payload);
    },
    saveUserTransactions: (
      state,
      action: PayloadAction<Array<TransactionData>>
    ) => {
      state.transactions = action.payload;
    },
    clearTransactionData: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  saveTransactionData,
  saveUserTransactions,
  clearTransactionData,
} = transactionDataSlice.actions;

export default transactionDataSlice.reducer;
