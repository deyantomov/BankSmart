import { loginUser } from "../../services/auth.service.js";

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const { accessToken, refreshToken } = await loginUser(email, password);

    req.accessToken = accessToken;
    req.refreshToken = refreshToken;
    next();
  } catch (err) {
    if ((err.message = "Invalid email or password")) {
      return res.status(401).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
}
