import Account from "../models/Account.js";

function generateAccountId(currency) {
  return currency + Math.floor(Math.random() * (999999 - 100000 + 1));
}

export default async function generateUniqueAccountId(currency) {
  const size = 10;  //  number of generated ID's
  let uniqueAccountId;

  while (!uniqueAccountId) {
    const accountIds = Array.from({ length: size }, () => generateAccountId(currency));
    const existingAccounts = await Account.find({ accountId: { $in: accountIds } });

    const existingIds = new Set(existingAccounts.map(account => account.accountId));
    uniqueAccountId = accountIds.find(id => !existingIds.has(id));
  }

  return uniqueAccountId;
}