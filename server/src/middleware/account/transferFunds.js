import { transferFunds } from "../../services/account.service.js";
import { validateToken } from "../../services/token.service.js";

export async function transfer(req, res, next) {
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

  const { emailSender, emailReceiver, amount } = req.body;

  if (!(emailSender && emailReceiver && amount)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const isTransactionComplete = await transferFunds(emailSender, emailReceiver, amount);
    
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