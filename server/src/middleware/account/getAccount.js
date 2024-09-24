import { getAccountData } from "../../services/account.service.js";
import { validateToken } from "../../services/token.service.js";

export async function getAccount(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authorization.split(" ")[1];
    validateToken(token);
  } catch (err) {
    res.status(401).json({ message: err.message }); // invalid token
  }

  const { accountId } = req.body;

  if (!accountId) {
    return res.status(400).json({ message: "Account ID is required" });
  }

  try {
    const accountData = await getAccountData(accountId);
    
    if (!accountData) {
      res.status(500).json({ message: "Couldn't find account "});
    }

    req.accountData = accountData;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}