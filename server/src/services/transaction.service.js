import mongoose from "mongoose";
import User from "../models/User.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import convertCurrency from "../helpers/convertCurrency.js";

/**
 * Transfer funds if the sender has sufficient funds. Converts the amount if the currencies between the two accounts are different.
 * Save transaction history to transactions collection.
 * 
 * @async
 * @param {string} senderId 
 * @param {string} receiverId 
 * @param {number} amount 
 * @returns {Promise<boolean>}
 */
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
          holder: 1,
        }
      ),
      Account.findOne(
        { accountId: receiverId },
        {
          _id: 0,
          balance: 1,
          currency: 1,
          holder: 1,
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
      amount = await convertCurrency(
        sender.currency,
        receiver.currency,
        amount
      );
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
    const transactionInfo = new Transaction({
      senderId,
      receiverId,
      senderCurrency: sender.currency,
      receiverCurrency: receiver.currency,
      originalAmount,
      convertedAmount: amount,
      type: "transfer",
    });

    await transactionInfo.save({ session });

    //  save transfer document id to both users' transaction history
    await Promise.all([
      User.findOneAndUpdate(
        { email: sender.holder },
        {
          $push: {
            transactions: transactionInfo._id,
          },
        },
        { session }
      ),
      User.findOneAndUpdate(
        { email: receiver.holder },
        {
          $push: {
            transactions: transactionInfo._id,
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

/**
 * Deposit funds to an account. Save transaction history to transactions collection.
 * 
 * @async
 * @param {string} accountId 
 * @param {number} amount 
 * @param {string} tokenBearerEmail 
 * @returns {Promise<boolean>}
 */
export const depositFunds = async (accountId, amount, tokenBearerEmail) => {
  const { holder } = await Account.findOne({ accountId });

  if (holder !== tokenBearerEmail) {
    throw new Error("Access denied");
  }

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

    const transaction = new Transaction({
      accountId,
      originalAmount: amount,
      type: "deposit",
    });

    await transaction.save({ session });

    await User.findOneAndUpdate(
      {
        email: tokenBearerEmail,
      },
      {
        $push: {
          transactions: transaction._id,
        },
      },
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }

  return true;
};

/**
 * Withdraw funds from account if it has sufficient balance. Save transaction history to transactions collection.
 * 
 * @async
 * @param {string} accountId 
 * @param {number} amount 
 * @param {string} tokenBearerEmail 
 * @returns {Promise<boolean>}
 */
export const withdrawFunds = async (accountId, amount, tokenBearerEmail) => {
  const { holder } = await Account.findOne({ accountId });

  if (holder !== tokenBearerEmail) {
    throw new Error("Access denied");
  }

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

    const transaction = new Transaction({
      accountId,
      originalAmount: amount,
      type: "withdrawal",
    });

    await transaction.save({ session });

    await User.findOneAndUpdate(
      {
        email: tokenBearerEmail,
      },
      {
        $push: {
          transactions: transaction._id,
        },
      },
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }

  return true;
};
