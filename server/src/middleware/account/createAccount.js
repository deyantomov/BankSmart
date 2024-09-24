import { createNewAccount } from "../../services/account.service.js";

export async function createAccount(req, res, next) {
  const { email, accountType, currency } = req.body;

  if (!(email && accountType && currency)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const accountId = await createNewAccount(email, accountType, currency);
    
    if (!accountId) {
      res.status(500).json({ message: "Couldn't create account "});
    }

    req.accountId = accountId;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}