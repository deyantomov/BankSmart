import User from "../models/User.js";

export const getUserData = async (email, tokenBearerEmail) => {
  const user = await User.findOne(
    { email },
    {
      _id: 0,
      password: 0,
      __v: 0,
    }
  );
  
  if (user.email !== tokenBearerEmail) {
    throw new Error("Access denied");
  }

  return user;
};
