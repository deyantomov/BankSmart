import User from "../models/User.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

/**
 * Get user data.
 * 
 * @param {string} email 
 * @param {string} tokenBearerEmail 
 * @returns {Promise<User>}
 */
export const getUserData = async (email, tokenBearerEmail) => {
  const user = await User.findOne(
    { email },
    {
      _id: 0,
      password: 0,
      __v: 0,
    }
  );

  if (user.email !== tokenBearerEmail) {
    throw new Error("Access denied");
  }

  return user;
};

/**
 * Get all user accounts.
 * 
 * @async
 * @param {string} email 
 * @returns {Array<Account>}
 */
export const getUserAccountData = async (email) => {
  const { accounts } = await User.findOne({ email });

  if (!accounts || accounts.length === 0) return [];

  const allAccounts = await Account.aggregate([
    {
      $match: {
        holder: email,
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

  return allAccounts;
};

/**
 * Get all user transactions
 * 
 * @async
 * @param {string} email 
 * @returns {Array<Transaction>}
 */
export const getUserTransactionHistory = async (email) => {
  const { transactions } = await User.findOne({ email });

  if (!transactions || transactions.length === 0) return [];
  const allTransactions = [];

  for (const id of transactions) {
    const transaction = await Transaction.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $set: {
          originalAmount: {
            $convert: {
              input: "$originalAmount",
              to: "double",
            },
          },
          convertedAmount: {
            $convert: {
              input: "$convertedAmount",
              to: "double",
            },
          },
        },
      },
      {
        $addFields: { //  exclude converted amount for transactions such as deposit and withdrawal
          convertedAmount: {
            $cond: {
              if: { $eq: ["$convertedAmount", null] },
              then: "$$REMOVE",
              else: "$convertedAmount",
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

    if (!transaction) continue;

    allTransactions.push(transaction[0]);
  }

  return allTransactions;
};
