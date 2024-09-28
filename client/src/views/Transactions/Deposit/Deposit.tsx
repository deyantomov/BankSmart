import { Card } from "react-daisyui";
import withNavigation from "../../../hoc/withNavigation/withNavigation";

function Deposit() {
  return (
    <div className="flex flex-col justify-center-items-center w-full h-full bg-primary p-8">
      <h1 className="text-5xl mb-12 text-white">Deposit</h1>
      <Card className="flex items-center w-full h-full bg-white rounded-md">
        <div className="w-1/2 h-full bg-green-300">

        </div>
        <div className="w-1/2 h-full bg-yellow-300">

        </div>
      </Card>
    </div>
  )
}

export default withNavigation(Deposit);