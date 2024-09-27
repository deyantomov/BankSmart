import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Card, Table, Button } from "react-daisyui";
import { FiPlusCircle } from "react-icons/fi";

export default function TransactionTile() {
  const navigate = useNavigate();
  const { transactions } = useSelector(
    (state: RootState) => state.transactionData
  );
  const { userData: user } = useSelector((state: RootState) => state);

  const handleViewDetails = () => {
    navigate("/transactions");
  }

  return (
    <div className="flex flex-col gap-4 w-full h-auto px-4 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">Transactions</h1>
        <Button 
          className="btn btn-ghost text-primary text-xl rounded-md"
          onClick={handleViewDetails}
        >
          View details
        </Button>
      </div>
      {transactions.length > 0 ? (
        <Table className="w-full text-xl">
          <Table.Head className="bg-slate-200 text-2xl">
            <span />
            <span>Type</span>
            <span>Amount</span>
          </Table.Head>
          <Table.Body>
            {transactions.map((transaction: any, index: number) => {
              let rowStyle = "";

              if (transaction.type === "deposit") {
                rowStyle = "text-green-600";
              } else if (transaction.type === "withdrawal") {
                rowStyle = "text-red-600";
              } else if (transaction.type === "transfer") {
                rowStyle = user.accounts.includes(
                  transaction.receiverId as string
                )
                  ? "text-green-600"
                  : "text-red-600";
              }

              return (
                <Table.Row
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-slate-200" : ""
                  } ${rowStyle}`}
                >
                  <span className="text-lg text-black">{index + 1}</span>
                  <span>
                    {transaction.type[0].toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span>{transaction.originalAmount}</span>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Card className="flex flex-col justify-center items-center w-full h-auto p-8 bg-slate-200 text-lg md:text-xl col-span-3">
          <h2 className="text-xl mb-6">No transactions</h2>
          <div 
            className="flex flex-col items-center"
            onClick={handleViewDetails}
          >
            <FiPlusCircle size={32} className="mb-1 text-success" />
            <p className="text-xs text-gray">See more information here</p>
          </div>
        </Card>
      )}
    </div>
  );
}
