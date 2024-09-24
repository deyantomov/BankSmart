import { withdrawFunds } from "../../services/transaction.service.js";

export async function withdraw(req, res, next) {
  const { accountId, amount } = req.body;

  if (!(accountId && amount)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const isWithdrawalComplete = await withdrawFunds(accountId, amount);

    if (!isWithdrawalComplete) {
      res.status(500).json({ message: "Couldn't withdraw funds " });
    }

    req.amt = amount;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
