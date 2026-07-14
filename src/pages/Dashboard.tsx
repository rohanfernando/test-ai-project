```typescript
import React, { useState, ReactNode } from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  icon?: ReactNode; // Optional icon for each card
  trend?: 'up' | 'down'; // To indicate trend color
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon, trend }) => {
  const trendColorClass = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : '';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className={`text-sm font-medium ${trendColorClass}`}>
        {change}
      </div>
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  avatar: ReactNode;
  userName: string;
  action: string;
  time: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ avatar, userName, action, time }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      {avatar}
      <div className="ml-3">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{userName}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
};

// --- Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Dummy data for KPI cards
  const kpiData = [
    { title: 'Total Revenue', value: '$125,345', change: '+5.2%', trend: 'up', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7 3 3-7 7-3-3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12h.01M6 12h.01M21 12h.01"></path></svg> },
    { title: 'New Customers', value: '1,234', change: '+10.8%', trend: 'up', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> },
    { title: 'Orders', value: '5,678', change: '-1.5%', trend: 'down', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
    { title: 'Conversion Rate', value: '3.45%', change: '+0.3%', trend: 'up', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> },
  ];

  // Dummy data for activity feed
  const activityFeedData = [
    { avatar: <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>, userName: 'John Doe', action: 'completed an order', time: '2 minutes ago' },
    { avatar: <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">AS</div>, userName: 'Alice Smith', action: 'signed up for a newsletter', time: '5 minutes ago' },
    { avatar: <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">SB</div>, userName: 'Bob Johnson', action: 'updated his profile', time: '10 minutes ago' },
    { avatar: <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">CL</div>, userName: 'Charlie Brown', action: 'made a purchase', time: '15 minutes ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-md hover:bg-gray-600 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                icon={kpi.icon}
                trend={kpi.trend}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Activity</h2>
            <div>
              {activityFeedData.map((activity, index) => (
                <ActivityFeedItem
                  key={index}
                  avatar={activity.avatar}
                  userName={activity.userName}
                  action={activity.action}
                  time={activity.time}
                />
              ))}
            </div>
          </div>

          {/* Placeholder for potential other sections, e.g., charts or quick actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Stats</h2>
            <div className="flex flex-col space-y-4">
              <div className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-bold">Users Online:</span> 1,200
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-bold">Server Load:</span> 75%
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-bold">Active Projects:</span> 25
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
```