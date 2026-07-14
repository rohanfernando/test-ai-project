```typescript
import React, { useState } from 'react';

// Dummy data for demonstration
const kpiData = [
  { title: 'Total Revenue', value: '$120,567', change: '+4.5%' },
  { title: 'New Customers', value: '1,234', change: '+10.2%' },
  { title: 'Orders Today', value: '87', change: '-1.1%' },
  { title: 'Conversion Rate', value: '3.7%', change: '+0.5%' },
];

const activityFeedItems = [
  { id: 1, user: 'Alice Smith', action: 'placed an order', time: '5 mins ago' },
  { id: 2, user: 'Bob Johnson', action: 'updated profile', time: '15 mins ago' },
  { id: 3, user: 'Charlie Brown', action: 'completed a task', time: '30 mins ago' },
  { id: 4, user: 'Diana Prince', action: 'left a review', time: '1 hour ago' },
  { id: 5, user: 'Ethan Hunt', action: 'logged in', time: '2 hours ago' },
];

// Helper to determine color based on percentage change
const getChangeColor = (change: string): string => {
  if (change.startsWith('+')) {
    return 'text-green-500';
  } else if (change.startsWith('-')) {
    return 'text-red-500';
  }
  return 'text-gray-500';
};

// KPI Card Component
const KpiCard: React.FC<{ title: string; value: string; change: string }> = ({
  title,
  value,
  change,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
      <span className={`text-sm font-medium ${getChangeColor(change)}`}>
        {change}
      </span>
    </div>
  );
};

// Activity Feed Item Component
const ActivityFeedItem: React.FC<{ user: string; action: string; time: string }> = ({
  user,
  action,
  time,
}) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mr-3">
        {user.charAt(0)}
      </div>
      <div>
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'dark bg-gray-900' : 'bg-gray-100'
      } p-6 font-sans`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <svg
              className="h-6 w-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 18v1M4.21 4.21l1.414 1.414m1.414-1.414L5.625 5.625M21 12h-1M4 12H3m3.464 4.536l1.414 1.414M1.59 18.364l1.414-1.414M12 21v-1M7.05 7.05l-1.414-1.414M19.79 10.21l-1.414 1.414M12 8a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.388 3.354 8.753 8.753 0 0013 6a8.753 8.753 0 0013 6a8.753 8.753 0 00-13 6z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* KPI Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} title={kpi.title} value={kpi.value} change={kpi.change} />
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Activity Feed
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {activityFeedItems.map((item) => (
            <ActivityFeedItem
              key={item.id}
              user={item.user}
              action={item.action}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```