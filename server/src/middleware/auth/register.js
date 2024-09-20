import { registerUser } from "../../services/auth.service.js";

export async function register(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  if (!(email && password, firstName, lastName)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    await registerUser(email, password, firstName, lastName);

    req.firstName = firstName;
    req.lastName = lastName;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
}
