import { transferFunds } from "../../services/transaction.service.js";

export async function transfer(req, res, next) {
  const { senderId, receiverId, amount } = req.body;

  if (!(senderId && receiverId && amount)) {
    res.status(400).json({ message: "All fields required" });
  }

  try {
    const isTransactionComplete = await transferFunds(senderId, receiverId, amount);
    
    if (!isTransactionComplete) {
      res.status(500).json({ message: "Couldn't complete transaction "});
    }

    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}