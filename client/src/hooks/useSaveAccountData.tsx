import { useDispatch } from 'react-redux';
import { saveAccountData } from '../features/account/accountDataSlice';
import { getAccountData } from '../routes/account';

export default function useSaveAccountData(): any {
  const dispatch = useDispatch();

  return async (accountId: string, token: string) => {
    const result = await getAccountData(accountId, token) as any;
    const account = result.data[0];
    dispatch(saveAccountData(account));

    return account;
  };
}