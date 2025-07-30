import React, { useEffect, useState } from "react";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentActivity from "../components/dashboard/RecentActivity";
import { MdLibraryBooks, MdPersonAdd, MdBook } from "react-icons/md";

import { getTotalBooksCount } from "../services/bookService";
import {
  getMonthlyLendings,
  getTotalLendingsCount,
  getTotalOverdueCount,
  type MonthlyLending,
} from "../services/lendingService";
import { getTotalReaders } from "../services/readerService";
import { getRecentActivity, type Activity } from "../services/activityService";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/Loading";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bookCount, setBookCount] = useState<number>(0);
  const [lendingCount, setLendingCount] = useState<number>(0);
  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [readers, setReaders] = useState<number>(0);
  const [monthlyLending, setMonthlyLending] = useState<MonthlyLending[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookCount = async () => {
    try {
      setLoading(true);
      const count = await getTotalBooksCount();
      setBookCount(count);
    } catch (error) {
      console.error("Error fetching book count:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLendingCount = async () => {
    try {
      setLoading(true);
      const count = await getTotalLendingsCount();
      setLendingCount(count);
    } catch (error) {
      console.error("Error fetching lending count:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOverdueCount = async () => {
    try {
      const count = await getTotalOverdueCount();
      setOverdueCount(count);
    } catch (error) {
      console.error("Error fetching overdue count:", error);
    }
  };

  const fetchReadersCount = async () => {
    try {
      setLoading(true);
      const count = await getTotalReaders();
      setReaders(count);
    } catch (error) {
      console.error("Error fetching readers count:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyLending = async () => {
    try {
      const data = await getMonthlyLendings();
      setMonthlyLending(data);
    } catch (error) {
      console.error("Error fetching monthly lending data:", error);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      setLoadingActivities(true);
      const activities = await getRecentActivity();
      setRecentActivities(activities);
    } catch (error) {
      console.error("Error fetching recent activities:", error);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchBookCount();
    fetchLendingCount();
    fetchOverdueCount();
    fetchReadersCount();
    fetchMonthlyLending();
    fetchRecentActivities();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-wide text-teal-300">
            Library Dashboard
          </h1>
          <p className="mt-2 text-gray-400">
            Welcome back! Here’s what’s happening in the Book Club Library.
          </p>
        </header>

        {/* Stats */}
        <section>
          <DashboardStats
            totalCustomers={readers}
            totalItems={bookCount}
            totalOrders={lendingCount}
            totalRevenue={overdueCount}
          />
        </section>

        {/* Chart */}
        <section className="mt-12 bg-gray-800 rounded-xl shadow-lg p-8">
          <DashboardCharts monthlyLending={monthlyLending} />
        </section>

        {/* Quick Actions */}
        <section className="mt-12 bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl text-teal-300 font-semibold mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: MdBook,
                label: "Lend Book",
                color: "text-teal-400",
                hoverBg: "hover:bg-teal-700",
                border: "border-teal-600",
                onClick: () => navigate("/dashboard/lendings"),
              },
              {
                icon: MdPersonAdd,
                label: "Add Reader",
                color: "text-green-400",
                hoverBg: "hover:bg-green-700",
                border: "border-green-600",
                onClick: () => navigate("/dashboard/readers"),
              },
              {
                icon: MdLibraryBooks,
                label: "Add Book",
                color: "text-indigo-400",
                hoverBg: "hover:bg-indigo-700",
                border: "border-indigo-600",
                onClick: () => navigate("/dashboard/books"),
              },
            ].map(({ icon: Icon, label, color, hoverBg, border, onClick }) => (
              <button
                key={label}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border ${border} bg-gray-900 text-gray-100 transition duration-200 ${hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500`}
                type="button"
                onClick={onClick}
              >
                <Icon className={`w-8 h-8 mb-2 ${color}`} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-6 bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl text-teal-300 font-semibold mb-6">
            Recent Activity
          </h2>
          {loadingActivities ? (
            <p className="text-gray-400">Loading recent activities...</p>
          ) : (
            <RecentActivity activities={recentActivities} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
