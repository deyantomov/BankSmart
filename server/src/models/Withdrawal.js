import mongoose, { Schema } from "mongoose";

const withdrawalSchema = new mongoose.Schema(
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

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

export default Withdrawal;
