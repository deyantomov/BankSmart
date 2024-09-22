import mongoose, { Schema } from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    senderId: {
      type: "string",
      required: true,
    },
    receiverId: {
      type: "string",
      required: true,
    },
    senderCurrency: {
      type: "string",
      required: true,
    },
    receiverCurrency: {
      type: "string",
      required: true,
    },
    originalAmount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    convertedAmount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
