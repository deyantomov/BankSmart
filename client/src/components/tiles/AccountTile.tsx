import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { Card, Button } from "react-daisyui";
import { FiPlusCircle, FiArrowRight } from "react-icons/fi";

export default function AccountTile() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accounts } = useSelector((state: RootState) => state.accountData);

  const handleViewAllAccounts = () => {
    navigate("/accounts");
  }

  return (
    <div className="flex flex-col gap-4 w-auto h-auto px-4 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="p-4 text-3xl">Accounts</h1>
        <Button 
          className="btn btn-ghost text-primary text-xl rounded-md"
          onClick={handleViewAllAccounts}
        >
          View details
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {accounts.length > 0 ? (
          accounts.slice(0, 5).map((account) => {
            return (
              <Card
                key={account.accountId}
                className="w-full h-auto p-8 bg-slate-200 text-lg md:text-xl"
              >
                <h2 className="text-2xl md:text-3xl mb-4">
                  Account ID: {account.accountId}
                </h2>
                <h2>
                  Type:{" "}
                  {account.type[0].toUpperCase().concat(account.type.slice(1))}
                </h2>
                <h2>Currency: {account.currency}</h2>
                <h3>Balance: {Number(account.balance.toFixed(2))}</h3>
                <div className="flex justify-center items-center mt-6">
                  <Button className="btn btn-ghost w-full text-lg text-primary rounded-md">
                    Details
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="flex flex-col justify-center items-center w-full h-auto p-8 bg-slate-200 text-lg md:text-xl col-span-3">
            <h2 className="text-xl mb-6">No accounts</h2>
            <Link
              to="/create-account"
              state={pathname}
              className="flex flex-col items-center"
            >
              <FiPlusCircle size={32} className="mb-1 text-success" />
              <p className="text-xs text-gray">Create a new account here</p>
            </Link>
          </Card>
        )}
        {accounts.length >= 5 && (
          <Card 
            className="flex gap-4 justify-center items-center bg-gray-800/40 text-2xl text-white hover:cursor-pointer"
            onClick={handleViewAllAccounts}
          >
            <h2>See all accounts</h2>
            <FiArrowRight />
          </Card>
        )}
      </div>
    </div>
  );
}
