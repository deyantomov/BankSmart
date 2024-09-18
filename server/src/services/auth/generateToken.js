import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET || "";

export function generateToken(username) {
  let data = {
    iss: "BankSmart", // issuer
    name: username, // holder
    iat: new Date(), // issued at
    exp: new Date() + 3600, // expires after one hour
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
}
