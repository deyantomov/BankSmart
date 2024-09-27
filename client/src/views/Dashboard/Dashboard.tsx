import withNavigation from "../../hoc/withNavigation/withNavigation";
import UserDetails from "../../components/tiles/UserDetails";
import AccountTile from "../../components/tiles/AccountTile";
import TransactionTile from "../../components/tiles/TransactionTile";

function Dashboard() {
  return (
    <div className="flex flex-col w-auto h-full">
      <UserDetails />
      <AccountTile />
      <TransactionTile />
    </div>
  )
}

export default withNavigation(Dashboard);