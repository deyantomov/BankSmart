import withNavigation from "../../hoc/withNavigation/withNavigation";
import { Card } from "react-daisyui";

function Transactions() {
  return (
    <div className="w-full h-full p-4 text-xl">
      <h1 className="p-4 text-3xl">New transactions</h1>
      <div className="grid grid-cols-3 w-full h-2/3 p-4 gap-8">
        <Card className="flex justify-center items-center bg-slate-200">
          Deposit
        </Card>
        <Card className="flex justify-center items-center bg-slate-200">
          Withdraw
        </Card>
        <Card className="flex justify-center items-center bg-slate-200">
          Transfer
        </Card>
      </div>
      <h1 className="p-4 text-3xl">Transaction history</h1>
    </div>
  )
}

export default withNavigation(Transactions);