import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Card, Button } from "react-daisyui";

export default function UserDetails() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state);

  const handleViewProfile = () => {
    navigate("/my-profile");
  };

  return (
    <div className="flex flex-col gap-4 w-full h-auto px-8 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">User</h1>
        <Button
          className="btn btn-ghost text-primary text-xl rounded-md"
          onClick={handleViewProfile}
        >
          View details
        </Button>
      </div>
      <Card className="w-full h-auto p-8 bg-slate-200 text-lg md:text-xl text-nowrap">
        <h2 className="text-2xl md:text-3xl text-wrap mb-4">E-mail: {user.email}</h2>
        <h2>First name: {user.firstName}</h2>
        <h2>Last name: {user.lastName}</h2>
        <h3>
          Accounts: {user.accounts.reduce((acc) => ++acc, 0)}
        </h3>
        <h3>
          Transactions: {user.transactions.reduce((acc) => ++acc, 0)}
        </h3>
      </Card>
    </div>
  );
}
