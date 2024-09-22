import mongoose, { Schema } from "mongoose";

const depositSchema = new mongoose.Schema(
  {
    accountId: {
      type: "string",
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

const Deposit = mongoose.model("Deposit", depositSchema);

export default Deposit;