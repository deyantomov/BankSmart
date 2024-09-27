import { FiXCircle } from "react-icons/fi";
import withNavigation from "../../hoc/withNavigation/withNavigation";

function NotFound() {
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      <FiXCircle size={96} color="red"/>
      <h1 className="text-xl">404 Not found</h1>
    </div>
  )
}

export default withNavigation(NotFound);