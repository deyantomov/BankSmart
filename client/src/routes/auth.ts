import axios from "axios";
import endpointBuilder from "../common/endpointBuilder";

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  if (!(email && password)) {
    throw new Error("All fields required");
  }

  const requestData = {
    email,
    password,
  };

  try {
    const response = await axios.post(endpointBuilder("login"), requestData);
    return response.data as LoginResponse;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const register = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<RegisterResponse> => {
  if (!(email && firstName && lastName && password)) {
    throw new Error("All fields required");
  }

  const requestData = {
    email,
    firstName,
    lastName,
    password,
  };

  try {
    const response = await axios.post(endpointBuilder("register"), requestData);
    return response.data as RegisterResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
