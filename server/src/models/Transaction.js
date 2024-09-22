import mongoose, { Schema } from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: "string"
    },
    senderId: {
      type: "string",
    },
    receiverId: {
      type: "string",
    },
    currency: {
      type: "string",
    },
    senderCurrency: {
      type: "string",
    },
    receiverCurrency: {
      type: "string",
    },
    originalAmount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    convertedAmount: {
      type: Schema.Types.Decimal128,
    },
    type: {
      type: "string",
      required: true,
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
