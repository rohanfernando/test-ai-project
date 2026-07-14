```typescript
import React, { useState } from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  trend?: string; // e.g., "up", "down"
  trendValue?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, trendValue }) => {
  const getTrendClasses = () => {
    if (trend === 'up') {
      return 'text-green-500';
    }
    if (trend === 'down') {
      return 'text-red-500';
    }
    return 'text-gray-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 truncate">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{value}</div>
      {trend && trendValue && (
        <div className={`flex items-center text-sm ${getTrendClasses()}`}>
          {trend === 'up' && <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5 5 5M7 17l5-5 5 5"></path></svg>}
          {trend === 'down' && <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5-5-5m5-6v12"></path></svg>}
          {trendValue}
        </div>
      )}
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  avatar: string;
  name: string;
  action: string;
  timestamp: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ avatar, name, action, timestamp }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-4 object-cover" />
      <div className="flex-grow">
        <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">{name}</span> {action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
      </div>
      <button className="text-xs text-blue-500 hover:underline ml-4">View</button>
    </div>
  );
};

// --- Main Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Dummy data for demonstration
  const kpiData = [
    { title: 'Total Revenue', value: '$1,234,567', trend: 'up', trendValue: '+5.2%' },
    { title: 'New Customers', value: '765', trend: 'up', trendValue: '+10.1%' },
    { title: 'Orders Processed', value: '5,432', trend: 'down', trendValue: '-2.5%' },
    { title: 'Average Order Value', value: '$227.15', trend: 'up', trendValue: '+1.8%' },
  ];

  const activityFeedData = [
    { avatar: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=A', name: 'Alice Johnson', action: 'submitted a new order', timestamp: '2 hours ago' },
    { avatar: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=B', name: 'Bob Williams', action: 'updated their profile', timestamp: '5 hours ago' },
    { avatar: 'https://via.placeholder.com/40/3357FF/FFFFFF?text=C', name: 'Charlie Brown', action: 'commented on a task', timestamp: '1 day ago' },
    { avatar: 'https://via.placeholder.com/40/FF33A1/FFFFFF?text=D', name: 'Diana Prince', action: 'logged in', timestamp: '2 days ago' },
    { avatar: 'https://via.placeholder.com/40/F1C40F/FFFFFF?text=E', name: 'Ethan Hunt', action: 'requested a refund', timestamp: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-6 md:p-12">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 18v-1m4.66-1.66a9 9 0 10-10.52 0l.47.67a9 9 0 0010.52 0l.47-.67zM12 10a2 2 0 012 2v.01M6.61 7.57A8.978 8.978 0 004.66 10M9 14a1 1 0 11-2 0 1 1 0 012 0zm0 0v3m0 0a1 1 0 112 0 1 1 0 01-2 0z"></path></svg>
          ) : (
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 12.23a9 9 0 11-8.453-8.453 9.004 9.004 0 0010.31 10.31z"></path></svg>
          )}
        </button>
      </header>

      <main>
        {/* KPI Card Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KpiCard key={index} title={kpi.title} value={kpi.value} trend={kpi.trend} trendValue={kpi.trendValue} />
            ))}
          </div>
        </section>

        {/* Activity Feed List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-96 overflow-y-auto">
            {activityFeedData.map((item, index) => (
              <ActivityFeedItem
                key={index}
                avatar={item.avatar}
                name={item.name}
                action={item.action}
                timestamp={item.timestamp}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
```