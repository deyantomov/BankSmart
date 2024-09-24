import { withdrawFunds } from "../../services/transaction.service.js";

export async function withdraw(req, res, next) {
  const { user } = req;
  const { accountId, amount } = req.body;

  if (!(accountId && amount)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const isWithdrawalComplete = await withdrawFunds(accountId, amount, user.email);

    if (!isWithdrawalComplete) {
      res.status(500).json({ message: "Couldn't withdraw funds " });
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
