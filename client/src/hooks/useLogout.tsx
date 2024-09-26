import { useDispatch } from "react-redux";
import { clearUserData } from "../features/user/userSlice";
import { clearAccountData } from "../features/account/accountDataSlice";

export default function useLogout() {
  const dispatch = useDispatch();

  return () => {
    dispatch(clearUserData());
    dispatch(clearAccountData());
  };
}
