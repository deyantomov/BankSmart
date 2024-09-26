import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Card, Button } from "react-daisyui"

export default function UserDetails() {
  const user = useSelector((state: RootState) => state.user);
  
  return (
    <div className="flex flex-col gap-4 w-full h-auto px-8 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">User</h1>
        <Button className="btn btn-ghost text-primary text-xl rounded-md">View details</Button>
      </div>
      <Card className="w-full h-auto p-8 bg-slate-200">
        <h2 className="text-3xl mb-4">E-mail: {user.email}</h2>
        <h2 className="text-xl">First name: {user.firstName}</h2>
        <h2 className="text-xl">Last name: {user.lastName}</h2>
        <h3 className="text-xl">Accounts: {user.accounts.reduce((acc) => ++acc, 0)}</h3>
        <h3 className="text-xl">Transactions: {user.transactions.reduce((acc) => ++acc, 0)}</h3>
      </Card>
    </div>
  )
}