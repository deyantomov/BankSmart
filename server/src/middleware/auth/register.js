import { registerUser } from "../../services/auth/registerUser.js";

export async function register(req, res, next) {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    await registerUser(username, password, password);

    req.username = username;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
