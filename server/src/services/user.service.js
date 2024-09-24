import User from "../models/User.js";

export const getUserData = async (email) => {
  return await User.findOne(
    { email },
    {
      _id: 0,
      password: 0,
      __v: 0,
    }
  );
};
