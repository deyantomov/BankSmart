import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "./token.service.js";

export const registerUser = async (username, email, password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: passwordHash,
    });

    await user.save();
  } catch (err) {
    throw new Error(`Could not register user ${username}`);
  }

  return true;
};

export const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const token = generateToken(username);
      return token;
    } else {
      return "Invalid password";
    }
  } catch (error) {
    throw new Error("An error occurred while trying to log in");
  }
}