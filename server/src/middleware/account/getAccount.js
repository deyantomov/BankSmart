import User from "../../models/User.js";
import { getAccountData } from "../../services/account.service.js";
import { validateToken } from "../../services/token.service.js";

export async function getAccount(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  let decodedToken;

  try {
    const token = authorization.split(" ")[1];
    decodedToken = validateToken(token);
  } catch (err) {
    return res.status(401).json({ message: err.message }); // invalid token
  }

  const { accountId } = req.body;

  if (!accountId) {
    return res.status(400).json({ message: "Account ID is required" });
  }

  try {
    const accountData = await getAccountData(accountId, decodedToken.email); //  pass the email to check if the holder of the account is the holder of the token

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
