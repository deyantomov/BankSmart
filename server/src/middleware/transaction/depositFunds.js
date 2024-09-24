import { depositFunds } from "../../services/transaction.service.js";

export async function deposit(req, res, next) {
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
