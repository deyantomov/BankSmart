import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-daisyui";
import withNavigation from "../../hoc/withNavigation/withNavigation";

function Accounts() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCreateAccountView = () => {
    navigate("/create-account", { state: pathname });
  }
  
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col xl:flex-row w-full h-full p-8">
        <div className="flex flex-col w-full h-full xl:w-1/2 justify-start items-center">
          <h1 className="text-3xl">Checking</h1>
        </div>
        <div className="border-b-2 border-b-primary xl:border-r-2 xl:border-r-primary my-4"/>
        <div className="flex flex-col w-full h-full xl:w-1/2 justify-start items-center">
          <h1 className="text-3xl">Savings</h1>
        </div>
      </div>
      <Button 
        className="btn btn-ghost flex absolute top-20 right-2 mt-3 justify-center items-center"
        onClick={handleCreateAccountView}
      >
        New account
      </Button>
    </div>
  )
}

export default withNavigation(Accounts);