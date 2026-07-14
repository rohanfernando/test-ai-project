```typescript
import React, { useState } from 'react';

// Define types for KPI data
interface KPI {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
}

// Define types for activity feed items
interface ActivityItem {
  id: number;
  user: string;
  action: string;
  timestamp: string;
}

// --- KPI Card Component ---
const KPI_Card: React.FC<KPI> = ({ label, value, change, trend }) => {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</div>
      {change && (
        <div className={`mt-2 text-sm ${getTrendColor()}`}>
          {trend === 'up' ? '▲' : '▼'} {change}
        </div>
      )}
    </div>
  );
};

// --- Activity Feed Item Component ---
const Activity_Feed_Item: React.FC<ActivityItem> = ({ user, action, timestamp }) => {
  return (
    <li className="py-3 px-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
        <span className="text-gray-800 dark:text-white font-bold text-sm">{user.charAt(0).toUpperCase()}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{timestamp}</p>
      </div>
    </li>
  );
};

const Dashboard: React.FC = () => {
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );

  // Dummy data for KPI cards
  const kpiData: KPI[] = [
    { label: 'Total Revenue', value: '$120,567', change: '12.5%', trend: 'up' },
    { label: 'New Customers', value: '1,234', change: '5.2%', trend: 'up' },
    { label: 'Orders This Month', value: '5,432', change: '2.1%', trend: 'down' },
    { label: 'Average Order Value', value: '$22.20', change: '0.8%', trend: 'up' },
  ];

  // Dummy data for activity feed
  const activityFeed: ActivityItem[] = [
    { id: 1, user: 'Alice', action: 'placed an order #5678', timestamp: '2 minutes ago' },
    { id: 2, user: 'Bob', action: 'updated their profile', timestamp: '15 minutes ago' },
    { id: 3, user: 'Charlie', action: 'logged in from a new device', timestamp: '30 minutes ago' },
    { id: 4, user: 'Alice', action: 'commented on a post', timestamp: '1 hour ago' },
    { id: 5, user: 'David', action: 'registered successfully', timestamp: '2 hours ago' },
  ];

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 md:p-10">
      {/* Header with Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 18v1M4.21 4.21l1.42 1.42m11.49 11.49l1.42 1.42m0 0L16 10.5M5 10.5l1.42-1.42M12 9v3m3 3H9"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 12.753A10.03 10.03 0 0112 20.626v-2.354m2.354-2.354C17.822 14.639 18 13.115 18 11.5a8.5 8.5 0 00-17 0c0 1.524.174 3.05.524 4.547m2.354-2.354a2.5 2.5 0 10-5.008 0"
              />
            </svg>
          )}
        </button>
      </div>

      {/* KPI Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPI_Card key={index} {...kpi} />
        ))}
      </div>

      {/* Activity Feed Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activity Feed</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {activityFeed.map((item) => (
            <Activity_Feed_Item key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
```