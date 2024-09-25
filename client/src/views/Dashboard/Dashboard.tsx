import withNavigation from "../../layouts/withNavigation/withNavigation";

function Dashboard() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <h1 className="text-3xl">Dashboard</h1>
    </div>
  )
}

export default withNavigation(Dashboard);