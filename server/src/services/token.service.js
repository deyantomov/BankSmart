import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET || "";

export function generateToken(email) {
  const timeNow = Math.floor(Date.now() / 1000); // must be in seconds since Unix epoch (1/1/1970)

  const data = {
    iss: "BankSmart", // issuer
    name: email, // holder
    iat: timeNow, // issued at
    exp: timeNow + 3600, // expires after one hour
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
}

export function validateToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}
