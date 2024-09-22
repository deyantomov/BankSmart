import mongoose from "mongoose";
import User from "../models/User.js";
import Account from "../models/Account.js";
import Transfer from "../models/Transfer.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
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

export const transferFunds = async (senderId, receiverId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const senderBalance = Number(
      (
        await Account.findOne(
          { accountId: senderId },
          {
            _id: 0,
            balance: 1,
          }
        )
      )["balance"]
    );

    if (!(senderBalance >= amount)) {
      throw new Error("Insufficient funds");
    }

    //  decrement sender balance by amount
    await Account.findOneAndUpdate(
      { accountId: senderId },
      {
        $inc: {
          balance: -amount,
        },
      },
      { session }
    );

    //  increment receiver balance by amount
    await Account.findOneAndUpdate(
      { accountId: receiverId },
      {
        $inc: {
          balance: amount,
        },
      },
      { session }
    );

    //  save to transfer history
    const transferInfo = new Transfer({
      senderId,
      receiverId,
      amount,
    });

    await transferInfo.save({ session });

    const transferId = transferInfo._id;
    const [sender, receiver] = await Promise.all([
      (await Account.findOne({ accountId: senderId }))["holder"],
      (await Account.findOne({ accountId: receiverId }))["holder"],
    ]);

    await Promise.all([
      await User.findOneAndUpdate(
        { email: sender },
        {
          $push: {
            transactions: transferId,
          },
        },
        { session }
      ),
      await User.findOneAndUpdate(
        { email: receiver },
        {
          $push: {
            transactions: transferId,
          },
        },
        { session }
      ),
    ]);

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }

  return true;
};

export const depositFunds = async (accountId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Account.findOneAndUpdate(
      { accountId },
      {
        $inc: {
          balance: amount,
        },
      },
      { session }
    );

    const deposit = new Deposit({
      accountId,
      amount,
    });

    await deposit.save({ session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }

  return true;
};

export const withdrawFunds = async (accountId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const accountBalance = Number(
      (
        await Account.findOne(
          { accountId },
          {
            _id: 0,
            balance: 1,
          }
        )
      )["balance"]
    );

    if (!(accountBalance >= amount)) {
      throw new Error("Insufficient funds");
    }

    await Account.findOneAndUpdate(
      { accountId },
      {
        $inc: {
          balance: -amount,
        },
      },
      { session }
    );

    const withdrawal = new Withdrawal({
      accountId,
      amount,
    });

    await withdrawal.save({ session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }

  return true;
};
