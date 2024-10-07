import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET || "";

const generateTokenData = (email) => {
  const timeNow = Math.floor(Date.now() / 1000); // must be in seconds since Unix epoch (1/1/1970)

  const accessTokenData = {
    iss: "BankSmart", // issuer
    email: email, // holder
    iat: timeNow, // issued at
    exp: timeNow + 3600, // expires after one hour
  };

  const refreshTokenData = {
    iss: "BankSmart",
    email: email,
    iat: timeNow,
    exp: timeNow + 86400, // expires after one day
  };

  return { accessTokenData, refreshTokenData };
};

export function generateToken(email) {
  const { accessTokenData, refreshTokenData } = generateTokenData(email);
  const accessToken = jwt.sign(accessTokenData, jwtSecretKey);
  const refreshToken = jwt.sign(refreshTokenData, jwtSecretKey);

  return { accessToken, refreshToken };
}

export function validateToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export function refreshToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const { accessTokenData } = generateTokenData(decoded.email);
    const accessToken = jwt.sign(accessTokenData, jwtSecretKey);

    return accessToken;
  } catch (err) {
    throw new Error("Invalid token");
  }
}
