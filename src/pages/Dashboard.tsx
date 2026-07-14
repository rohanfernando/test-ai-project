```typescript
import React, { useState } from 'react';

// Dummy data for KPI cards (replace with actual data fetching)
const kpiData = [
  { title: 'Total Revenue', value: '$1,250,000', change: '+5.2%' },
  { title: 'New Customers', value: '1,520', change: '+10.8%' },
  { title: 'Sales Last Month', value: '$180,000', change: '-2.1%' },
  { title: 'Customer Satisfaction', value: '92%', change: '+1.5%' },
];

// Dummy data for activity feed (replace with actual data fetching)
const activityFeedData = [
  { id: 1, type: 'New Order', details: 'Order #12345 placed by John Doe.', time: '2 hours ago' },
  { id: 2, type: 'User Login', details: 'Alice Smith logged in from New York.', time: '5 hours ago' },
  { id: 3, type: 'Product Update', details: 'Version 2.1 of Product X released.', time: 'Yesterday' },
  { id: 4, type: 'Support Ticket', details: 'New ticket #T987 opened by Jane Smith.', time: '2 days ago' },
];

// --- Sub-components ---

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </span>
    </div>
  );
};

interface ActivityItemProps {
  type: string;
  details: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ type, details, time }) => {
  return (
    <li className="py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{type}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{details}</p>
        </div>
        <div className="ml-auto text-xs text-gray-400 dark:text-gray-500">{time}</div>
      </div>
    </li>
  );
};

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode class to the body or html element for global effect
    document.body.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}>
      <header className="bg-white dark:bg-gray-800 shadow p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isDarkMode ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 18v-1M4.2 4.2l1.4-1.4M19.8 19.8l-1.4-1.4M6 12H3m18 0h-3M6 6l1.4-1.4M19.8 19.8l-1.4 1.4M12 9a3 3 0 100-6 3 3 0 000 6z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.354 3.354C8.666 2.354 10.313 1 12 1s3.334 1.354 3.646 2.354a9 9 0 00-1.354 14.708z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* KPI Card Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KpiCard key={index} title={kpi.title} value={kpi.value} change={kpi.change} />
            ))}
          </div>
        </section>

        {/* Activity Feed List */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {activityFeedData.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  type={activity.type}
                  details={activity.details}
                  time={activity.time}
                />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
```