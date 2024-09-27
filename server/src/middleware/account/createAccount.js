import { createNewAccount } from "../../services/account.service.js";

export async function createAccount(req, res, next) {
  const { user } = req;
  const { accountType, currency } = req.body;

  if (!(accountType && currency)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const accountId = await createNewAccount(user.email, accountType, currency);
    
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