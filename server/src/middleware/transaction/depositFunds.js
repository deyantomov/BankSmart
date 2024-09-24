import { depositFunds } from "../../services/transaction.service.js";

export async function deposit(req, res, next) {
  const { user } = req;
  const { accountId, amount } = req.body;

  if (!(accountId && amount)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const isDepositComplete = await depositFunds(accountId, amount, user.email);

    if (!isDepositComplete) {
      res.status(500).json({ message: "Couldn't deposit funds" });
    }

    req.amt = amount;
    next();
  } catch (err) {
    if (err.message === "Access denied") {
      return res.status(403).json({ message: err.message });
    }
    
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
