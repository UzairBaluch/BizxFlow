import { Link } from "react-router-dom";
import {
  MdDashboard, // Dashboard
  MdInventory, // Inventory
  MdSettings, // Settings
  MdPerson, // Profile
} from "react-icons/md";

import {
  FaBox, // Products
  FaMoneyBill, // Sales
  FaUsers, // Customers
  FaUserTie, // Employees
  FaReceipt, // Expenses
  FaChartBar, // Reports
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      className="w-64 h-screen flex flex-col"
      style={{ backgroundColor: "#769bff" }}
    >
      {/* Logo Section */}
      <div className="p- text-center border-b border-white/20">
        <h2
          className="text-white text-3xl p-2 font-semibold"
          style={{ fontFamily: "PolySans-neutral, sans-serif" }}
        >
          Bizxflow
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <FaBox size={20} />
          <span>Products</span>
        </Link>

        <Link
          to="/sales"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <FaMoneyBill size={20} />
          <span>Sales</span>
        </Link>

        <Link
          to="/inventory"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <MdInventory size={20} />
          <span>Inventory</span>
        </Link>
        <Link
          to="/reports"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <FaChartBar size={20} />
          <span>Reports</span>
        </Link>
        <Link
          to="/customers"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <FaUsers size={20} />
          <span>Customers</span>
        </Link>
          <Link
          to="/expenses"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <FaReceipt size={20} />
          <span>Expenses</span>
        </Link>

        <Link
          to="/employees"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <FaUserTie size={20} />
          <span>Employees</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <MdSettings size={20} />
          <span>Settings</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white/20 mb-2"
        >
          <MdPerson size={20} />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
