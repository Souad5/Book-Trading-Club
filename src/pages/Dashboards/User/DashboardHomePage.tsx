import AppAreaChart from './AppAreaChart';
import AppBarChart from './AppBarChart';
import AppPieChart from './AppPieChart';
import CardList from './CardList';

const DashboardHomePage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <h1 className="text-lg font-medium mb-6">Total Users</h1>
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title="Latest Transactions"></CardList>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <h1 className="text-lg font-medium mb-6">Browser Usage</h1>
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">Test</div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <h1 className="text-lg font-medium mb-6">Total Users</h1>
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title="Popular Content"></CardList>
      </div>
    </div>
  );
};

export default DashboardHomePage;
