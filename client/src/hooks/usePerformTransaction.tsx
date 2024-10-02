import { useDispatch } from 'react-redux';
import { saveUserAccounts } from '../features/account/accountDataSlice';
import { getUserAccounts } from '../routes/user';
import { depositFunds, withdrawFunds, transferFunds } from '../routes/account';

export type transactionType = "Transfer" | "Deposit" | "Withdraw";

export default function usePerformTransaction(type: transactionType): any {
  const dispatch = useDispatch();

  return async (amount: number, token: string, accountId?: string, receiverId?: string) => {
    let accounts, response: any;
    
    switch (type) {
      case "Transfer":
        if (!(accountId && receiverId)) {
          throw new Error("Sender or Receiver ID not provided");
        }

        response = await transferFunds(accountId, receiverId, amount, token);
        accounts = (await getUserAccounts(token))["data"];

        dispatch(saveUserAccounts(accounts));

        return response.message;
      case "Deposit":
        if (!accountId) {
          throw new Error("Account ID not provided");
        }

        response = await depositFunds(accountId, amount, token);
        accounts = (await getUserAccounts(token))["data"];

        dispatch(saveUserAccounts(accounts));

        return response.message;
      case "Withdraw":
        if (!accountId) {
          throw new Error("Account ID not provided");
        }

        response = await withdrawFunds(accountId, amount, token);
        accounts = (await getUserAccounts(token))["data"];

        console.log(response);
        dispatch(saveUserAccounts(accounts));


        return response.message;
    }
  };
}