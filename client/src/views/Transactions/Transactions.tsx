import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import withNavigation from "../../hoc/withNavigation/withNavigation";
import { Card, Button } from "react-daisyui";

function Transactions() {
  const { transactionData: { transactions } } = useSelector((state: RootState) => state);

  console.log(transactions);

  // Filter transactions based on type
  const deposits = transactions.filter((transaction: any) => transaction.type === 'deposit');
  const withdrawals = transactions.filter((transaction: any) => transaction.type === 'withdrawal');
  const transfers = transactions.filter((transaction: any) => transaction.type === 'transfer');

  return (
    <div className="w-full h-full p-4 text-xl">
      <h1 className="p-4 text-3xl">New transactions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-1/2 p-4 gap-8">
        <Card className="flex justify-center items-center bg-slate-200">
          <Button className="btn btn-ghost w-1/3 text-xl">Deposit</Button>
        </Card>
        <Card className="flex justify-center items-center bg-slate-200">
          <Button className="btn btn-ghost w-1/3 text-xl">Withdraw</Button>
        </Card>
        <Card className="flex justify-center items-center bg-slate-200">
          <Button className="btn btn-ghost w-1/3 text-xl">Transfer</Button>
        </Card>
      </div>
      <h1 className="p-4 text-3xl">Transaction history</h1>
      {transactions.length > 0 ? 
      (
        <div className="w-full h-1/3 p-4 text-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full h-full p-4">
            <div>
              <h2 className="text-2xl mb-4">Deposits</h2>
              {deposits.map((transaction: any, index: number) => (
                <Card key={index} className="text-xl bg-slate-200 p-4 mb-4">
                  <p>{transaction.type}</p>
                </Card>
              ))}
            </div>
            <div>
              <h2 className="text-2xl mb-4">Withdrawals</h2>
              {withdrawals.map((transaction: any, index: number) => (
                <Card key={index} className="text-xl bg-slate-200 p-4 mb-4">
                  <p>{transaction.type}</p>
                </Card>
              ))}
            </div>
            <div>
              <h2 className="text-2xl mb-4">Transfers</h2>
              {transfers.map((transaction: any, index: number) => (
                <Card key={index} className="text-xl bg-slate-200 p-4 mb-4">
                  <p>{transaction.type}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : 
      (
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
