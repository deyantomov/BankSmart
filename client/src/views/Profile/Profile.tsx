import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import withNavigation from "../../hoc/withNavigation/withNavigation";

function Profile() {
  const { userData: user } = useSelector((state: RootState) => state);

  return (
    <div className="w-full h-full p-4">
      <h1>{user.email}</h1>
      <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
    </div>
  )
}

export default withNavigation(Profile);