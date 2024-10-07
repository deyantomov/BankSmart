import { refreshToken } from "../../services/token.service.js";

export async function refreshJWT(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authorization.split(" ")[1];
    let accessToken = refreshToken(token);

    req.accessToken = accessToken;
    next();
  } catch (err) {
    if ((err.message = "Invalid token")) {
      return res.status(401).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
}
