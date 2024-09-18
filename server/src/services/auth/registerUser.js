import bcrypt from "bcrypt";
import User from "../../models/User.js";

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
