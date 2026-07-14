```tsx
import React, { useState } from 'react';

// --- KPI Card Component ---

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, trend }) => {
  const trendClasses = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const arrow = trend === 'up' ? '▲' : '▼';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
      {change && (
        <div className={`text-sm font-medium ${trendClasses}`}>
          {arrow} {change}
        </div>
      )}
    </div>
  );
};

// --- Activity Feed Item Component ---

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, description, time }) => {
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      <div className="flex-1">
        <div className="font-medium text-gray-800 dark:text-gray-200">{title}</div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      </div>
      <div className="text-gray-500 dark:text-gray-500 text-xs">{time}</div>
    </div>
  );
};

// --- Dashboard Page Component ---

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to apply dark mode to the body or app root if needed
    document.body.classList.toggle('dark');
  };

  // Dummy data for demonstration
  const kpiData = [
    { title: 'Total Revenue', value: '$120,500', change: '15.3%', trend: 'up' },
    { title: 'New Users', value: '5,800', change: '8.2%', trend: 'up' },
    { title: 'Active Projects', value: '75', change: '2.1%', trend: 'down' },
    { title: 'Customer Satisfaction', value: '4.5/5', change: '0.1', trend: 'up' },
  ];

  const activityFeedData = [
    { icon: '⭐', title: 'New Feature Launched', description: 'The all-new project management module is now live!', time: '2m ago' },
    { icon: '✅', title: 'Task Completed', description: 'Project Alpha: Final report submitted.', time: '15m ago' },
    { icon: '💬', title: 'New Message Received', description: 'From: Sarah J. - Regarding: Q3 Budget Review.', time: '30m ago' },
    { icon: '📈', title: 'Performance Update', description: 'Weekly sales report generated.', time: '1h ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Activity Feed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-5">Activity Feed</h2>
          <div>
            {activityFeedData.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={
                  <span role="img" aria-label="icon">
                    {activity.icon}
                  </span>
                }
                title={activity.title}
                description={activity.description}
                time={activity.time}
              />
            ))}
          </div>
        </div>

        {/* Placeholder for other dashboard elements if needed */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Other Widgets/Charts</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```