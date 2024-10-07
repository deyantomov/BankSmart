import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "./token.service.js";

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
