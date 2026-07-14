```tsx
import React, { useState } from 'react';

// --- Sub-components (defined inline for brevity) ---

interface KPIState {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  change: string;
}

interface KPIProps {
  data: KPIState;
}

const KPICard: React.FC<KPIProps> = ({ data }) => {
  const getTrendColor = () => {
    switch (data.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'flat':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{data.title}</h3>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{data.value}</div>
      <div className={`flex items-center space-x-2 ${getTrendColor()}`}>
        <span>{data.trend === 'up' ? '▲' : data.trend === 'down' ? '▼' : '▬'}</span>
        <span>{data.change}</span>
      </div>
    </div>
  );
};

interface ActivityFeedItemState {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

interface ActivityFeedProps {
  items: ActivityFeedItemState[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ items }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activity Feed</h2>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">{item.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const kpiData: KPIState[] = [
    { title: 'Total Revenue', value: '$1,245,678', trend: 'up', change: '+5.2%' },
    { title: 'New Users', value: '15,432', trend: 'up', change: '+8.1%' },
    { title: 'Orders', value: '5,678', trend: 'flat', change: '0.0%' },
    { title: 'Conversion Rate', value: '3.75%', trend: 'down', change: '-1.5%' },
  ];

  const activityFeedItems: ActivityFeedItemState[] = [
    {
      icon: '🛒',
      title: 'New Order Placed',
      description: 'Order #12345 placed by John Doe.',
      time: '5 minutes ago',
    },
    {
      icon: '🌟',
      title: 'User Registered',
      description: 'Jane Smith registered an account.',
      time: '15 minutes ago',
    },
    {
      icon: '💬',
      title: 'New Message',
      description: 'You received a message from support.',
      time: '30 minutes ago',
    },
    {
      icon: '🚀',
      title: 'Feature Launched',
      description: 'New dashboard analytics feature is live.',
      time: '1 hour ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={handleToggleDarkMode}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Placeholder for charts or other larger components */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart Area Placeholder</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed items={activityFeedItems} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```