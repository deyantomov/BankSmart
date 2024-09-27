import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Table, Button } from "react-daisyui";

export default function TransactionTile() {
  const { transactions } = useSelector(
    (state: RootState) => state.transactionData
  );

  return (
    <div className="flex flex-col gap-4 w-full h-auto px-4 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">Transactions</h1>
        <Button className="btn btn-ghost text-primary text-xl rounded-md">
          View details
        </Button>
      </div>
      <Table className="w-full text-xl">
        <Table.Head className="bg-slate-200 text-2xl">
          <span />
          <span>Type</span>
          <span>Amount</span>
        </Table.Head>
        <Table.Body>
          {transactions.map((transaction, index) => (
            <Table.Row key={index} className={`${index % 2 !== 0 && "bg-slate-200"}`}>
              <span className="text-lg">{index + 1}</span>
              <span>
                {transaction.type[0].toUpperCase() + transaction.type.slice(1)}
              </span>
              <span>{transaction.originalAmount}</span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
