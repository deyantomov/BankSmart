import mongoose from "mongoose";
import User from "../models/User.js";
import Account from "../models/Account.js";
import Transfer from "../models/Transfer.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
import generateAccountId from "../helpers/generateAccountId.js";
import convertCurrency from "../helpers/convertCurrency.js";

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
    //  the balance, currency and holder fields will be needed
    const [sender, receiver] = await Promise.all([
      Account.findOne(
        { accountId: senderId },
        {
          _id: 0,
          balance: 1,
          currency: 1,
          holder: 1
        }
      ),
      Account.findOne(
        { accountId: receiverId },
        {
          _id: 0,
          balance: 1,
          currency: 1,
          holder: 1
        }
      ),
    ]);

    //  check if sender has sufficient balance
    if (!(Number(sender.balance) >= amount)) {
      throw new Error("Insufficient funds");
    }

    //  convert amount if the sender and the receiver account use different currencies
    let originalAmount = amount;
    if (sender.currency !== receiver.currency) {
      amount = await convertCurrency(sender.currency, receiver.currency, amount);
    }

    //  start the transaction if there is sufficient balance in the sender account and after the currency is converted:
    //  - update sender account by subtracting the original amount
    //  - update receiver account by adding the converted amount
    //  - create a transfer document containing the amount, and the two parties' id's and save to transfer collection
    //  - save the id of the transfer document to both users' transaction history
    session.startTransaction();

    //  take funds from sender and send to receiver
    await Account.findOneAndUpdate(
      { accountId: senderId },
      {
        $inc: {
          balance: -originalAmount,
        },
      },
      { session }
    );

    await Account.findOneAndUpdate(
      { accountId: receiverId },
      {
        $inc: {
          balance: amount,
        },
      },
      { session }
    );

    //  transfer document
    const transferInfo = new Transfer({
      senderId,
      receiverId,
      senderCurrency: sender.currency,
      receiverCurrency: receiver.currency,
      originalAmount,
      convertedAmount: amount,
    });

    await transferInfo.save({ session });

    //  save transfer document id to both users' transaction history
    await Promise.all([
      User.findOneAndUpdate(
        { email: sender.holder },
        {
          $push: {
            transactions: transferInfo._id,
          },
        },
        { session }
      ),
      User.findOneAndUpdate(
        { email: receiver.holder },
        {
          $push: {
            transactions: transferInfo._id,
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
