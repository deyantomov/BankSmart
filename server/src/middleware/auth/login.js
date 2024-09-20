import { loginUser } from "../../services/auth.service.js";

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const token = await loginUser(email, password);

    req.token = token;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
