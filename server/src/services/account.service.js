import mongoose from "mongoose";
import Account from "../models/Account.js";
import User from "../models/User.js";
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
    session.endSession();
  }

  return accountId;
};
