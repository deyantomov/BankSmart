import { useDispatch } from 'react-redux';
import { saveUserAccounts } from '../features/account/accountDataSlice';
import { getUserAccounts } from '../routes/account';

export default function useSaveUserAccounts(): any {
  const dispatch = useDispatch();

  return async (token: string) => {
    const result = (await getUserAccounts(token))["data"];
    dispatch(saveUserAccounts(result));

    return result;
  };
}