import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Button, Card } from "react-daisyui";
import withNavigation from "../../hoc/withNavigation/withNavigation";

function Accounts() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accounts } = useSelector((state: RootState) => state.accountData);

  const handleCreateAccountView = () => {
    navigate("/create-account", { state: pathname });
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full h-full p-4 xl:p-8">
        <div className="flex w-full justify-between items-center text-center p-2">
          <h1 className="text-xl md:text-2xl xl:text-3xl">Accounts</h1>
          <Button
            className="btn btn-ghost text-xs sm:text-sm md:text-md xl:text-xl"
            onClick={handleCreateAccountView}
          >
            New account
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full h-full py-4 xl:py-8">
          {accounts.map((account: any, index: number) => {
            return (
              <Card
                key={index}
                className="bg-slate-200 p-12 text-lg sm:text-xl xl:text-2xl"
              >
                <h2 className="text-3xl mb-4">
                  Account ID: {account.accountId}
                </h2>
                <h3>
                  Type:{" "}
                  {account.type[0].toUpperCase().concat(account.type.slice(1))}
                </h3>
                <h3>Currency: {account.currency}</h3>
                <h3>Balance: {account.balance.toFixed(2)}</h3>
                <h4>
                  Created at: {new Date(account.createdAt).toLocaleDateString()}
                </h4>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withNavigation(Accounts);
