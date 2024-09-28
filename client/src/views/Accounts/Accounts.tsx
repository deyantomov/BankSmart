import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Button } from "react-daisyui";
import withNavigation from "../../hoc/withNavigation/withNavigation";
import { FiPlus } from "react-icons/fi";
import AccountTable from "../../components/AccountTable/AccountTable";

function Accounts() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accounts } = useSelector((state: RootState) => state.accountData);

  const handleCreateAccountView = () => {
    navigate("/create-account", { state: pathname });
  }
  
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full h-full p-4 xl:p-8">
        <h1 className="text-xl sm:text-xl md:text-2xl xl:text-3xl">Accounts</h1>
        <AccountTable accounts={accounts} />
      </div>
      <Button 
        className="btn btn-ghost flex absolute bottom-0 xl:bottom-2 w-full justify-center items-center text-center text-xs sm:text-sm md:text-md xl:text-xl"
        onClick={handleCreateAccountView}
      >
        Create account
        <FiPlus className="text-success text-xs sm:text-sm md:text-md xl:text-xl mt-1" />
      </Button>
    </div>
  )
}

export default withNavigation(Accounts);