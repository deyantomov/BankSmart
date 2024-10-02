import { getAccountData } from "../../services/account.service.js";

export async function getAccount(req, res, next) {
  const { user } = req;
  const { accountId } = req.query;

  if (!accountId) {
    return res.status(400).json({ message: "Account ID is required" });
  }

  try {
    const accountData = await getAccountData(accountId, user.email); //  pass the email to check if the holder of the account is the holder of the token


    if (!accountData) {
      return res.status(500).json({ message: "Couldn't find account " });
    }

    req.accountData = accountData;
    next();
  } catch (err) {
    if (err.message === "Access denied") {
      return res.status(403).json({ message: err.message });
    }

    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
