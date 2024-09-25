import { getUserData } from "../../services/user.service.js";

export async function getUser(req, res, next) {
  const { user } = req;
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userData = await getUserData(email, user.email);
    
    if (!userData) {
      return res.status(500).json({ message: "Couldn't find account "});
    }

    req.userData = userData;
    next();
  } catch (err) {
    if (err.message === "Access denied") {
      return res.status(403).json({ message: err.message });
    }

    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}