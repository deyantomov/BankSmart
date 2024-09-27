import axios from "axios";
import endpointBuilder from "../common/endpointBuilder";

export interface AccountData {
  accountId: string;
  holder: string;
  type: string;
  currency: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export const createNewAccount = async(token: string, accountType: string, currency: string) => {
  if (!(token && accountType && currency)) {
    throw new Error("All fields required");
  }

  const headers = {
    authorization: `Bearer ${token}`,
  };

  const body = {
    accountType,
    currency
  }

  try {
    const { data } = await axios.post(endpointBuilder("createAccount"), body, { headers });

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export const getAccountData = async (accountId: string, token: string): Promise<any> => {
  if (!accountId) {
    throw new Error("Account ID not provided");
  }

  if (!token) {
    throw new Error("Token not provided");
  }

  const headers = {
    authorization: `Bearer ${token}`,
  };

  const params = {
    accountId,
  };

  try {
    const { data } = await axios.get(endpointBuilder("getAccountData"), {
      headers,
      params,
    });

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
