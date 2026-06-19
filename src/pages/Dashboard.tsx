```typescript
import React from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend }) => {
  const trendIcon = {
    up: '▲',
    down: '▼',
    neutral: '—',
  };

  const trendColorClass =
    trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className={`text-3xl font-bold text-gray-900 dark:text-white ${trendColorClass}`}>
          {value}
        </p>
        {trend && (
          <span className={`text-sm font-semibold ${trendColorClass}`}>
            {trendIcon[trend]}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  avatarUrl: string;
  userName: string;
  action: string;
  timestamp: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ avatarUrl, userName, action, timestamp }) => {
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <img
        src={avatarUrl}
        alt={`${userName}'s avatar`}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{userName}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
      </div>
    </div>
  );
};

// --- Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isSystemDarkMode);
    document.documentElement.classList.toggle('dark', isSystemDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  };

  const kpiData = [
    { title: 'Total Revenue', value: '$120,567', trend: 'up' },
    { title: 'New Customers', value: '5,234', trend: 'up' },
    { title: 'Orders Completed', value: '15,890', trend: 'neutral' },
    { title: 'Conversion Rate', value: '3.45%', trend: 'down' },
  ];

  const activityFeedData = [
    { avatarUrl: 'https://via.placeholder.com/40', userName: 'Alice Smith', action: 'completed an order', timestamp: '10 minutes ago' },
    { avatarUrl: 'https://via.placeholder.com/40', userName: 'Bob Johnson', action: 'signed up for a new account', timestamp: '30 minutes ago' },
    { avatarUrl: 'https://via.placeholder.com/40', userName: 'Charlie Brown', action: 'left a review', timestamp: '1 hour ago' },
    { avatarUrl: 'https://via.placeholder.com/40', userName: 'Diana Prince', action: 'updated their profile', timestamp: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} title={kpi.title} value={kpi.value} trend={kpi.trend} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="max-h-96 overflow-y-auto">
            {activityFeedData.map((item, index) => (
              <ActivityFeedItem
                key={index}
                avatarUrl={item.avatarUrl}
                userName={item.userName}
                action={item.action}
                timestamp={item.timestamp}
              />
            ))}
          </div>
        </div>

        {/* Placeholder for another section or could be combined */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">This section can contain charts or other overview data.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
```