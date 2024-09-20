import mongoose from "mongoose";

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
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
