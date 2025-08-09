import React, { useEffect, useState } from "react";
import { BookOpen, Users, TrendingUp, Clock, Plus, Activity, Calendar, ArrowUpRight, Sparkles } from "lucide-react";

// // Mock components - replace with your actual components
// const DashboardStats = ({ totalCustomers, totalItems, totalOrders, totalRevenue }) => null;
// const DashboardCharts = ({ monthlyLending }) => null;
// const RecentActivity = ({ activities }) => null;
const LoadingAnimation = () => <div>Loading...</div>;

// Mock services - replace with your actual services
const getTotalBooksCount = () => Promise.resolve(1247);
const getTotalLendingsCount = () => Promise.resolve(856);
const getTotalOverdueCount = () => Promise.resolve(23);
const getTotalReaders = () => Promise.resolve(342);
const getMonthlyLendings = () => Promise.resolve([]);
const getRecentActivity = () => Promise.resolve([
  { id: 1, type: 'lending', description: 'Book "The Midnight Library" was lent to Sarah Johnson', time: '2 hours ago' },
  { id: 2, type: 'return', description: 'Book "Dune" was returned by Mike Chen', time: '4 hours ago' },
  { id: 3, type: 'new_book', description: 'New book "Project Hail Mary" added to collection', time: '1 day ago' }
]);

const Dashboard: React.FC = () => {
  const [bookCount, setBookCount] = useState<number>(0);
  const [lendingCount, setLendingCount] = useState<number>(0);
  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [readers, setReaders] = useState<number>(0);
  const [monthlyLending, setMonthlyLending] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeOfDay, setTimeOfDay] = useState<string>('');

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [books, lendings, overdue, readersData, monthlyData, activities] = await Promise.all([
        getTotalBooksCount(),
        getTotalLendingsCount(),
        getTotalOverdueCount(),
        getTotalReaders(),
        getMonthlyLendings(),
        getRecentActivity()
      ]);
      
      setBookCount(books);
      setLendingCount(lendings);
      setOverdueCount(overdue);
      setReaders(readersData);
      setMonthlyLending(monthlyData);
      setRecentActivities(activities);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    // Set time of day greeting
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good morning');
    else if (hour < 18) setTimeOfDay('Good afternoon');
    else setTimeOfDay('Good evening');
  }, []);

  const handleNavigation = (path: string) => {
    console.log(`Navigate to: ${path}`);
    // Replace with: navigate(path);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  const statsData = [
    {
      title: "Total Books",
      value: bookCount.toLocaleString(),
      change: "+12%",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      trend: "up"
    },
    {
      title: "Active Readers",
      value: readers.toLocaleString(),
      change: "+23%",
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      trend: "up"
    },
    {
      title: "Books Lent",
      value: lendingCount.toLocaleString(),
      change: "+8%",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      trend: "up"
    },
    {
      title: "Overdue",
      value: overdueCount.toString(),
      change: "-15%",
      icon: Clock,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-500/10",
      iconColor: "text-rose-400",
      trend: "down"
    }
  ];

  const quickActions = [
    {
      title: "Lend Book",
      description: "Process new book lending",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      path: "/dashboard/lendings"
    },
    {
      title: "Add Reader",
      description: "Register new member",
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
      hoverColor: "hover:from-cyan-600 hover:to-cyan-700",
      path: "/dashboard/readers"
    },
    {
      title: "Add Book",
      description: "Expand your collection",
      icon: Plus,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
      path: "/dashboard/books"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                  {timeOfDay}! 👋
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                  Here's what's happening in your book club today
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Calendar size={16} className="text-purple-400" />
                  <span className="text-white text-sm font-medium">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group hover:scale-105 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm`}>
                      <Icon size={24} className={stat.iconColor} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      <ArrowUpRight size={16} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Chart Section */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <TrendingUp className="text-purple-400" size={28} />
                <span>Library Analytics</span>
              </h2>
              <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl text-sm font-medium transition-colors border border-purple-500/30">
                View Details
              </button>
            </div>
            {/* Your DashboardCharts component would go here */}
            <div className="h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center">
              <p className="text-gray-400">Chart Component Placeholder</p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick Actions */}
            <section className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <Sparkles className="text-cyan-400" size={28} />
                  <span>Quick Actions</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.title}
                      onClick={() => handleNavigation(action.path)}
                      className={`group p-6 bg-gradient-to-br ${action.color} ${action.hoverColor} rounded-2xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-left`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <Icon size={24} />
                        </div>
                        <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                      <p className="text-white/80 text-sm">{action.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Activity className="text-emerald-400" size={24} />
                  <span>Recent Activity</span>
                </h2>
              </div>
              
              {loadingActivities ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-white/10 rounded mb-2"></div>
                      <div className="h-3 bg-white/5 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.slice(0, 5).map((activity, index) => (
                    <div key={activity.id || index} className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm leading-relaxed">
                          {activity.description}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;