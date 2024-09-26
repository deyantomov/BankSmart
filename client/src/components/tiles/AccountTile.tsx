import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Card, Button } from "react-daisyui"

export default function AccountTile() {
  const { accounts } = useSelector((state: RootState) => state.accountData);
  
  return (
    <div className="flex flex-col gap-4 w-full h-auto px-8 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">Accounts</h1>
        <Button className="btn btn-ghost text-primary text-xl rounded-md">View details</Button>
      </div>
      <div className="grid grid-cols-3 gap-8">
      {accounts.map((account) => {
        return (
          <Card className="w-full h-auto p-8 bg-slate-200">
            <h2 className="text-3xl mb-4">Account ID: {account.accountId}</h2>
            <h2 className="text-xl">Type: {account.type[0].toUpperCase().concat(account.type.slice(1))}</h2>
            <h2 className="text-xl">Currency: {account.currency}</h2>
            <h3 className="text-xl">Balance: {Number(account.balance.toFixed(2))}</h3>
            <div className="flex justify-center items center mt-6">
              <Button className="btn btn-ghost w-full text-lg text-primary rounded-md">Details</Button>
            </div>
          </Card>
        )
      })}
      </div>
    </div>
  )
}