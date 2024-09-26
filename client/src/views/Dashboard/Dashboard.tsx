import withNavigation from "../../layouts/withNavigation/withNavigation";
import AccountTile from "../../components/tiles/AccountTile";
import UserDetails from "../../components/tiles/UserDetails";

function Dashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <AccountTile />
      <UserDetails />
    </div>
  )
}

export default withNavigation(Dashboard);