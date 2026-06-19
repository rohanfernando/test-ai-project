```typescript
import React, { useState } from 'react';

// Helper component for KPI Cards
const KpiCard: React.FC<{ title: string; value: string; change?: string }> = ({
  title,
  value,
  change,
}) => {
  const changeColorClass = change?.startsWith('+') ? 'text-green-500' : 'text-red-500';
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 flex flex-col justify-between">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change && (
          <span className={`text-sm font-semibold ${changeColorClass}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

// Helper component for Activity Feed Items
const ActivityFeedItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
}> = ({ icon, title, description, timestamp }) => {
  return (
    <div className="flex items-start space-x-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">{timestamp}</div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {darkMode ? (
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
                  d="M20.354 12.21a9 9 0 11-8.486 8.485"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 00-9-9v0"
                />
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
                  d="M19 10h1a2 2 0 010 4h-1m-5 4h5a2 2 0 002-2v-5a2 2 0 00-2-2h-5a2 2 0 00-2 2v5a2 2 0 002 2zm-1 7h10a2 2 0 002-2v-5a2 2 0 00-2-2h-10a2 2 0 00-2 2v5a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* KPI Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Total Revenue" value="$1,234,567" change="+5.2%" />
          <KpiCard title="New Customers" value="5,678" change="+12.0%" />
          <KpiCard title="Orders" value="15,234" change="-1.5%" />
          <KpiCard title="Conversion Rate" value="3.14%" />
        </div>

        {/* Activity Feed and other content (placeholder for more components) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Feed</h2>
            <ActivityFeedItem
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
              title="New Order Placed"
              description="Order #ABC12345 for $75.50 has been placed."
              timestamp="10:30 AM"
            />
            <ActivityFeedItem
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              title="New User Registered"
              description="John Doe has successfully registered an account."
              timestamp="10:15 AM"
            />
            <ActivityFeedItem
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2a2 2 0 002-2h10a2 2 0 002-2H5a2 2 0 00-2 2v14a2 2 0 002 2h3m4 0v2m0-2v-2m0 0h2m0 0h2M9 3v2m0 0h2m0-2H9z" /></svg>}
              title="Product Restocked"
              description="Inventory for 'Premium Widget' has been updated."
              timestamp="9:45 AM"
            />
            <ActivityFeedItem
              icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0H5a2 2 0 01-2-2V6a2 2 0 012-2h6.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V8z" /></svg>}
              title="New Support Ticket"
              description="Ticket #TICKET007 received regarding payment issue."
              timestamp="9:00 AM"
            />
          </div>

          {/* Placeholder for another card/component */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400">Additional dashboard widgets can be placed here. This could include charts, custom statistics, or quick action buttons.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```