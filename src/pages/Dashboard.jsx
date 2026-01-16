import Layout from "../components/layout/Layout";
import { FaBox, FaMoneyBill, FaDollarSign, FaUsers } from "react-icons/fa";
import { useState } from "react";
function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(156);
  const [totalSales, setTotalSales] = useState(1240);
  const [revenue, setRevenue] = useState(45230);
  const [customers, setCustomers] = useState(89);
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
            <FaBox className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow">
            <FaMoneyBill className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-3xl font-bold">{totalSales}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
            <FaDollarSign className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold">${revenue}</p>
          </div>

          {/* Card 4 */}
          <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
            <FaUsers className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Customers</h3>
            <p className="text-3xl font-bold">{customers}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
