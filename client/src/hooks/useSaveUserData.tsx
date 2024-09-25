import { useDispatch } from 'react-redux';
import { saveUserData } from '../features/user/userSlice';
import { getUserData } from '../routes/user';

export default function useSaveUserData(): any {
  const dispatch = useDispatch();

  return async (email: string, token: string) => {
    const result = (await getUserData(email, token))["data"];
    dispatch(saveUserData(result));

    return result;
  };
}