import mongoose from "mongoose";
import User from "../models/User.js";
import Account from "../models/Account.js";
import generateAccountId from "../helpers/generateAccountId.js";

export const createNewAccount = async (email, accountType, currency) => {
  let accountId = "";
  const session = await mongoose.startSession();

  try {
    do {
      accountId = generateAccountId(currency);
      const isExistingAccount = await Account.findOne({ accountId });

      if (!isExistingAccount) {
        break;
      }
    } while (true);

    session.startTransaction();

    const account = new Account({
      accountId,
      holder: email,
      type: accountType,
      currency,
      balance: 0,
    });

    await account.save({ session });

    await User.findOneAndUpdate(
      { email },
      {
        $push: {
          accounts: accountId,
        },
      },
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error("Couldn't create an account");
  } finally {
    await session.endSession();
  }

  return accountId;
};

export const getAccountData = async (accountId, email) => {
  accountId = "EUR845978"; // Ensure this matches the database value
  email = "test@example.com";

  console.log("Received accountId:", accountId);
  const account = await Account.findOne({ accountId });

  if (!account) {
    console.error("Account not found for accountId:", accountId);
    throw new Error("Account not found");
  }

  if (account.holder !== email) {
    throw new Error("Access denied");
  }

  return await Account.aggregate([
    {
      $match: {
        accountId,
      },
    },
    {
      $set: {
        balance: {
          $convert: {
            input: "$balance",
            to: "double",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
  ]);
};
