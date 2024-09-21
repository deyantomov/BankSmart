import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    accounts: {
      type: [String],
      default: [],
    },
    transactions: {
      type: [Schema.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
