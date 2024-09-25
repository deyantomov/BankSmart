import { useDispatch } from "react-redux";
import { saveToken } from "../features/user/userSlice";
import { login } from "../routes/auth";

export default function useLogin() {
  const dispatch = useDispatch();

  return async (email: string, password: string) => {
    const { token } = await login(email, password);
    dispatch(saveToken(token));

    return token;
  };
}
