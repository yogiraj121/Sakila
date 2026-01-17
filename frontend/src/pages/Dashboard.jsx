import GlobalFilterBar from "../components/GlobalFilterBar";
import TopRentedFilms from "../components/TopRentedFilms";
import RevenueDistribution from "../components/RevenueDistribution";
import TopCustomers from "../components/TopCustomers";
import BusinessKPIs from "../components/BusinessKPIs";
import RecentTransactions from "../components/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <GlobalFilterBar />
      <BusinessKPIs />
      <div className="grid grid-cols-2 gap-6 mt-4">
        <TopRentedFilms />
        <RevenueDistribution />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <TopCustomers />
        <RecentTransactions />
      </div>
    </div>
  );
}
