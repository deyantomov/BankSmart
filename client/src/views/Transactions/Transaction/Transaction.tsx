import { useLocation } from "react-router-dom";
import { Card } from "react-daisyui";
import withNavigation from "../../../hoc/withNavigation/withNavigation";

function Transaction() {
  const { pathname } = useLocation();
  const transactionType = pathname[1].toUpperCase().concat(pathname.slice(2));

  if (transactionType === "Transfer") {
    return (
      <div className="flex flex-col justify-center-items-center w-full h-full bg-white">
        <Card className="flex justify-center items-center w-full h-full bg-white rounded-md">
          <h1 className="text-4xl text-black">Transfer</h1>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center-items-center w-full h-full bg-white">
      <Card className="flex justify-center items-center w-full h-full bg-white rounded-md">
        <h1 className="text-4xl text-black">{transactionType}</h1>
      </Card>
    </div>
  );
}

export default withNavigation(Transaction);
