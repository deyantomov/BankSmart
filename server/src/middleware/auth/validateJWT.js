import { validateToken } from "../../services/token.service.js";

export async function validateJWT(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authorization.split(" ")[1];
    let decodedToken = validateToken(token);

    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message }); // invalid token
  }
}
