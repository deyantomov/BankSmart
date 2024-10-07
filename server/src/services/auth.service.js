import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "./token.service.js";

/**
 * Hashes the plain text-password and saves the account to the database.
 *
 * @param {string} email
 * @param {string} password
 * @param {string} firstName
 * @param {string} lastName
 * @returns {boolean}
 */
export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
    });

    await user.save();
  } catch (err) {
    throw new Error(`Could not register user ${firstName} ${lastName}`);
  }

  return true;
};

/**
 * Attempt to find a user by email and compare passwords.
 * If both requirements are met generate access and refresh tokens held by the user by using the generateToken service and return them.
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const { accessToken, refreshToken } = generateToken(email);
      return { accessToken, refreshToken };
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
