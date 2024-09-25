import axios from "axios";
import endpointBuilder from "../common/endpointBuilder";

export interface UserData {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    accounts: Array<string>;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
  }
}

export const getUserData = async (email: string, token: string): Promise<UserData> => {
  if (!email) {
    throw new Error("Email not provided");
  }

  const requestData = {
    authorization: `Bearer ${token}`,
  };

  try {
    const data = await axios.get(endpointBuilder("getUserData"), {
      headers: requestData,
      params: { email },
    }) as UserData;

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
