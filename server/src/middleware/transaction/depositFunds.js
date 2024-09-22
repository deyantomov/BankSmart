import { depositFunds } from "../../services/transaction.service.js";
import { validateToken } from "../../services/token.service.js";

export async function deposit(req, res, next) {
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

  const { accountId, amount } = req.body;

  if (!(accountId && amount)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const isDepositComplete = await depositFunds(accountId, amount);

    if (!isDepositComplete) {
      res.status(500).json({ message: "Couldn't deposit funds " });
    }

    req.amt = amount;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
