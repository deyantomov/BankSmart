import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import withNavigation from "../../hoc/withNavigation/withNavigation";
import { Card, Button } from "react-daisyui";

function Transactions() {
  const navigate = useNavigate();
  const { transactions } = useSelector((state: RootState) => state.transactionData); 
  const { accounts } = useSelector((state: RootState) => state.userData);

  const deposits = transactions.filter(
    (transaction: any) => transaction.type === "deposit"
  );
  const withdrawals = transactions.filter(
    (transaction: any) => transaction.type === "withdrawal"
  );
  const transfers = transactions.filter(
    (transaction: any) => transaction.type === "transfer"
  );

  const handleNavigateNewTransaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/${(e.target as HTMLButtonElement).value}`);
  }

  return (
    <div className="w-full h-full p-4 text-xl">
      <h1 className="p-4 text-3xl">New transactions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-1/2 p-4 gap-8">
        <Card className="flex justify-center items-center bg-slate-200">
          <Button 
            value="deposit"
            onClick={handleNavigateNewTransaction}
            className="btn btn-ghost w-1/3 text-xl"
          >
            Deposit</Button>
        </Card>
        <Card className="flex justify-center items-center bg-slate-200">
          <Button
            value="withdraw"
            onClick={handleNavigateNewTransaction}
            className="btn btn-ghost w-1/3 text-xl"
          >Withdraw</Button>
        </Card>
        <Card className="flex justify-center items-center bg-slate-200">
          <Button
            value="transfer"
            onClick={handleNavigateNewTransaction}
            className="btn btn-ghost w-1/3 text-xl"
          >Transfer</Button>
        </Card>
      </div>
      <h1 className="p-4 text-3xl">Transaction history</h1>
      {transactions.length > 0 ? (
        <div className="w-full h-1/3 text-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full h-full p-4">
            <div>
              <h2 className="text-2xl">Deposits</h2>
              <hr className="border-b border-b-primary m-4" />
              {deposits.map((transaction: any, index: number) => (
                <Card
                  key={index}
                  className="text-xl bg-slate-200 p-4 mb-4 rounded-md"
                >
                  <h3>Account ID: {transaction.accountId}</h3>
                  <h3 className="text-success">
                    Amount: {transaction.originalAmount}
                  </h3>
                  <h3 className="mt-4">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </h3>
                </Card>
              ))}
            </div>
            <div>
              <h2 className="text-2xl mb-4">Withdrawals</h2>
              <hr className="border-b border-b-primary m-4" />
              {withdrawals.map((transaction: any, index: number) => (
                <Card key={index} className="text-xl bg-slate-200 p-4 mb-4">
                  <h3>Account ID: {transaction.accountId}</h3>
                  <h3 className="text-error">
                    Amount: {transaction.originalAmount}
                  </h3>
                  <h3 className="mt-4">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </h3>
                </Card>
              ))}
            </div>
            <div>
              <h2 className="text-2xl mb-4">Transfers</h2>
              <hr className="border-b border-b-primary m-4" />
              {transfers.map((transaction: any, index: number) => {
                const isSending = accounts.includes(transaction.senderId);
                
                return (
                  <Card key={index} className="text-xl bg-slate-200 p-4 mb-4">
                  <h3>Sender ID: {transaction.senderId}</h3>
                  <h3>Receiver ID: {transaction.receiverId}</h3>
                  <h3 className={`${isSending ? "text-error" : "text-success"}`}>
                    Amount: {isSending ? transaction.originalAmount : transaction.convertedAmount}
                  </h3>
                  <h3>Currency: {isSending ? transaction.senderCurrency : transaction.receiverCurrency}</h3>
                  <h3 className="mt-4">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </h3>
                </Card>
              )})}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-1/3 p-4 text-xl">
          <div className="flex w-full h-full justify-center items-center p-4 bg-slate-200">
            <h2>Your history is empty</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default withNavigation(Transactions);
