import { getUserData } from "../../services/user.service.js";
import { validateToken } from "../../services/token.service.js";

export async function getUser(req, res, next) {
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

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userData = await getUserData(email);
    
    if (!userData) {
      res.status(500).json({ message: "Couldn't find account "});
    }

    req.userData = userData;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}