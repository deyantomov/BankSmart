import { getUserAccountData } from "../../services/user.service.js";

export async function getUserAccounts(req, res, next) {
  const { user } = req;

  try {
    //  use the email from the token
    const accountData = await getUserAccountData(user.email);

    if (!accountData) {
      return res.status(500).json({ message: "Couldn't find accounts" });
    }

    req.accountData = accountData;
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