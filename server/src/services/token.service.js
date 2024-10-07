import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET || "";

/**
 * Get current time and generate data for access and refresh tokens held by the given email - one expires after an hour, and the other after a day. 
 * 
 * @param {string} email 
 * @returns { accessTokenData, refreshTokenData }
 */
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

/**
 * Generate access and refresh tokens
 * 
 * @param {string} email 
 * @returns { accessToken: string, refreshToken: string } 
 */
export function generateToken(email) {
  const { accessTokenData, refreshTokenData } = generateTokenData(email);
  const accessToken = jwt.sign(accessTokenData, jwtSecretKey);
  const refreshToken = jwt.sign(refreshTokenData, jwtSecretKey);

  return { accessToken, refreshToken };
}

/**
 * Validate access token
 * 
 * @param {string} token 
 * @returns {jwt.JwtPayload}
 */
export function validateToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

/**
 * Generate new access token if the refresh token is valid
 * 
 * @param {string} token 
 * @returns {string}
 */
export function refreshToken(token) {
  try {
    const decoded = validateToken(token);
    const { accessTokenData } = generateTokenData(decoded.email);
    const accessToken = jwt.sign(accessTokenData, jwtSecretKey);

    return accessToken;
  } catch (err) {
    throw new Error("Invalid token");
  }
}
