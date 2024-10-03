import mongoose from "mongoose";
import User from "../models/User.js";
import Account from "../models/Account.js";
import generateUniqueAccountId from "../helpers/generateAccountId.js";
import logger, { loggerEnum } from "../helpers/logger.js";

export const createNewAccount = async (email, accountType, currency) => {
  let accountId = "";
  const session = await mongoose.startSession();

  try {
    accountId = await generateUniqueAccountId(currency);

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

    await logger(loggerEnum.new, `Account ${accountId} created`);
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
  const { holder } = await Account.findOne({ accountId });

  if (!holder) {
    throw new Error("Account not found");
  }

  if (holder !== email) {
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
