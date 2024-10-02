import { getUserTransactionHistory } from "../../services/user.service.js";

export async function getUserTransactions(req, res, next) {
  const { user } = req;

  try {
    const transactions = await getUserTransactionHistory(user.email);

    if (!transactions) {
      return res.status(500).json({ message: "Couldn't find accounts" });
    }

    req.transactions = transactions;
    next();
  } catch (err) {
    if (err.message === "Access denied") {
      return res.status(403).json({ message: err.message });
    }

    return res
      .status(500)
      .json({ message: err.message });
  }
}