import { useDispatch } from 'react-redux';
import { saveAccountData } from '../features/account/accountDataSlice';
import { createNewAccount, getAccountData } from '../routes/account';
import { saveUserAccount } from '../features/user/userSlice';

export default function useCreateAccount(): any {
  const dispatch = useDispatch();

  return async (token: string, accountType: string, currency: string) => {
    const result: any = await createNewAccount(token, accountType, currency);
    const accountId = (result.message.split(" "))[1];

    const accountData: any = (await getAccountData(accountId, token))["data"];
    dispatch(saveAccountData(accountData[0]));

    dispatch(saveUserAccount(accountId));

    return result;
  };
}