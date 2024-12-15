import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardStats() {
  const [stats, setStats] = useState({
    users_count: 0,
    items_count: 0,
    carts_count: 0,
    payments_count: 0,
    total_payment_value: 0,
    avis_count: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost/backend/dashboard_stats.php");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  // Chart data for displaying donut charts
  const chartData = (value, total, label) => ({
    labels: [label],
    datasets: [
      {
        data: [value, total - value],
        backgroundColor: ['#4CAF50', '#f3f3f3'],
        borderWidth: 0,
      },
    ],
  });

  return (
    <div className="dashboard-stats p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Dashboard Statistics</h2>
      {error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
          <div className="stat-card bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Users</h3>
            <div className="flex justify-center items-center">
              <Doughnut data={chartData(stats.users_count, 100, 'Users')} width={100} height={100} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.users_count}</p>
          </div>

          <div className="stat-card bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Items</h3>
            <div className="flex justify-center items-center">
              <Doughnut data={chartData(stats.items_count, 100, 'Items')} width={100} height={100} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.items_count}</p>
          </div>

          <div className="stat-card bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Carts</h3>
            <div className="flex justify-center items-center">
              <Doughnut data={chartData(stats.carts_count, 100, 'Carts')} width={100} height={100} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.carts_count}</p>
          </div>

        
          <div className="stat-card bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Payments</h3>
            <div className="flex justify-center items-center">
              <Doughnut data={chartData(stats.payments_count, 100, 'Payments')} width={100} height={100} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.payments_count}</p>
          </div>

     
          <div className="stat-card bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Total Payment Value</h3>
            <div className="flex justify-center items-center">
              <Doughnut data={chartData(stats.total_payment_value, 100, 'Total Payment')} width={100} height={100} />
            </div>
            <p className="text-3xl font-bold text-gray-900">${stats.total_payment_value}</p>
          </div>

    
          <div className="stat-card bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Reviews (Avis)</h3>
            <div className="flex justify-center items-center">
              <Doughnut data={chartData(stats.avis_count, 100, 'Reviews')} width={100} height={100} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.avis_count}</p>
          </div>
        </div>
      )}
    </div>
  );
}
