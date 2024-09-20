import { validateToken } from "../../services/token.service.js";

export function validateJWT(req, res, next) {
  

  try {
    const user = validateToken(authorization);
    
    req.user = user;
    next();
  } catch (err) {
    
  }
}