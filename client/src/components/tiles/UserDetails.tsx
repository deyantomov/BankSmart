import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Card, Button } from "react-daisyui";

export default function UserDetails() {
  const navigate = useNavigate();
  const { userData: user } = useSelector((state: RootState) => state);

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col gap-4 w-auto h-auto px-4 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">User</h1>
        <Button
          className="btn btn-ghost text-primary text-xl rounded-md"
          onClick={handleViewProfile}
        >
          View details
        </Button>
      </div>
      <Card className="w-full h-auto p-8 bg-slate-200 text-lg md:text-xl">
        <h2 className="text-2xl md:text-3xl mb-4">E-mail: {user.email}</h2>
        <h2>First name: {user.firstName}</h2>
        <h2>Last name: {user.lastName}</h2>
        <h3>
          Accounts: {user.accounts.length}
        </h3>
        <h3>
          Transactions: {user.transactions.length}
        </h3>
      </Card>
    </div>
  );
}
