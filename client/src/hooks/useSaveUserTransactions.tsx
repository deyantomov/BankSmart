import { useDispatch } from 'react-redux';
import { saveUserTransactions } from '../features/transaction/transactionDataSlice';
import { getUserTransactions } from '../routes/user';

export default function useSaveUserTransactions() {
  const dispatch = useDispatch();

  return async (token: string) => {
    const result = (await getUserTransactions(token))["data"];
    dispatch(saveUserTransactions(result));

    return result;
  };
}