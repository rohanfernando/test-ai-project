```typescript
import React, { useState } from 'react';

// --- Sub-Components (Inline Definitions) ---

// KPI Card Component
interface KpiCardProps {
  title: string;
  value: string;
  trend?: string; // e.g., "+5%" or "-2%"
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend }) => {
  const trendColorClass = trend?.startsWith('+')
    ? 'text-green-500'
    : trend?.startsWith('-')
    ? 'text-red-500'
    : 'text-gray-500';

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col justify-between">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{value}</p>
      {trend && (
        <div className={`text-sm font-semibold ${trendColorClass}`}>
          {trend}
        </div>
      )}
    </div>
  );
};

// Activity Feed Item Component
interface ActivityFeedItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, title, description, time }) => {
  return (
    <div className="flex items-start py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="mr-4 flex-shrink-0">
        <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
          {icon}
        </span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
          <time className="text-xs text-gray-500 dark:text-gray-400">{time}</time>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const kpiData = [
    { title: 'Total Revenue', value: '$120,500', trend: '+5%' },
    { title: 'New Customers', value: '1,250', trend: '+10%' },
    { title: 'Orders', value: '3,400', trend: '-2%' },
    { title: 'Conversion Rate', value: '3.5%', trend: '+0.5%' },
  ];

  const activityFeedData = [
    {
      icon: '🛒', // Example icon - could be an SVG or emoji
      title: 'New Order Placed',
      description: 'Customer #4582 placed a new order for two items.',
      time: '2 hours ago',
    },
    {
      icon: '⭐',
      title: 'Product Review Submitted',
      description: 'A new review was submitted for the "Premium Mug".',
      time: '5 hours ago',
    },
    {
      icon: '💬',
      title: 'New Support Ticket',
      description: 'Customer Alice responded to support ticket #TS-987.',
      time: '1 day ago',
    },
    {
      icon: '🚀',
      title: 'Shipment Completed',
      description: 'Order #ORD-6753 was successfully delivered.',
      time: '2 days ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 sm:p-8 lg:p-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          {isDarkMode ? (
            <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 18v-1M4.21 4.21l1.42 1.42m11.49 11.49l1.42 1.42M1 12h1m18 0h1M4.21 19.79l1.42-1.42M19.79 4.21l-1.42 1.42M12 12a9 9 0 110-18 9 9 0 010 18z"></path>
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 008 12a9 9 0 0012.354 8.646z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* KPI Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} title={kpi.title} value={kpi.value} trend={kpi.trend} />
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Activity Feed</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {activityFeedData.map((item, index) => (
            <ActivityFeedItem
              key={index}
              icon={<span>{item.icon}</span>} // Pass icon as ReactNode
              title={item.title}
              description={item.description}
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