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
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
