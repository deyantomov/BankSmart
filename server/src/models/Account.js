import mongoose, { Schema } from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountId: {
      type: "string",
      required: true,
    },
    holder: {
      type: "string",
      required: true,
    },
    type: {
      type: "string",
      required: true,
    },
    currency: {
      type: "string",
      required: true,
    },
    balance: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
