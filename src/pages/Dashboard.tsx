```typescript
import React, { useState } from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType }) => {
  const getChangeStyles = () => {
    if (!change) return '';
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      {change && (
        <div className={`text-sm font-medium ${getChangeStyles()}`}>
          {changeType === 'increase' && '+'}
          {changeType === 'decrease' && '-'}
          {change}
        </div>
      )}
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  icon: React.ReactNode;
  text: string;
  time: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, text, time }) => {
  return (
    <div className="flex items-start py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-gray-800 dark:text-gray-200 mb-1">{text}</p>
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
      </div>
    </div>
  );
};

// --- Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Set initial mode based on localStorage or system preference
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* KPI Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Total Revenue" value="$125,678" change="+$4,500" changeType="increase" />
        <KpiCard title="New Customers" value="1,234" change="+15%" changeType="increase" />
        <KpiCard title="Orders This Month" value="567" change="-3%" changeType="decrease" />
        <KpiCard title="Average Order Value" value="$221.65" />
      </div>

      {/* Activity Feed and potentially other sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">Recent Activity</h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <ActivityFeedItem
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0h6m-6 0-6 6"></path></svg>}
              text="New user registered: Jane Doe"
              time="10:30 AM"
            />
            <ActivityFeedItem
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 16v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h10a3 3 0 013 3v1"></path></svg>}
              text="Order #12345 fulfilled"
              time="9:15 AM"
            />
            <ActivityFeedItem
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903 3 3 0 111.346 5.962M7 16a4 4 0 014.797-4.797 3 3 0 015.455-1.568m-1.11 4.676a3 3 0 01-2.111-2.111M10 8h4"></path></svg>}
              text="Product 'Awesome Widget' restocked"
              time="Yesterday"
            />
             <ActivityFeedItem
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l7-7 3 3-7 7-3-3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l7-7 3 3-7 7-3-3z"></path></svg>}
              text="New feature deployed: Advanced Search"
              time="2 days ago"
            />
          </div>
        </div>

        {/* Placeholder for another section (e.g., charts, tasks) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">Quick Overview</h2>
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">Chart or other widget goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```