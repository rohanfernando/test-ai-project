```typescript
import React, { useState } from 'react';

// --- Types ---
interface KpiCardProps {
  title: string;
  value: string;
  change?: string; // e.g., "+1.2%"
  changeType?: 'increase' | 'decrease';
}

interface ActivityFeedItem {
  id: string;
  avatarUrl: string;
  name: string;
  action: string;
  timestamp: string;
}

// --- Sub-components ---

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType }) => {
  const changeClasses =
    changeType === 'increase'
      ? 'text-green-500'
      : changeType === 'decrease'
      ? 'text-red-500'
      : 'text-gray-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{value}</p>
      {change && (
        <p className={`text-sm font-medium ${changeClasses}`}>
          {change}
        </p>
      )}
    </div>
  );
};

const ActivityFeedItem: React.FC<ActivityFeedItem> = ({ avatarUrl, name, action, timestamp }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <img src={avatarUrl} alt={`${name}'s avatar`} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{name}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
      </div>
    </div>
  );
};

// --- Mock Data ---
const mockKpiData: KpiCardProps[] = [
  { title: 'Total Revenue', value: '$150,500', change: '+5.2%', changeType: 'increase' },
  { title: 'New Customers', value: '1,250', change: '+10.5%', changeType: 'increase' },
  { title: 'Conversion Rate', value: '4.7%', change: '-0.3%', changeType: 'decrease' },
  { title: 'Average Order Value', value: '$120.40', change: '+2.1%', changeType: 'increase' },
];

const mockActivityFeed: ActivityFeedItem[] = [
  { id: '1', avatarUrl: 'https://via.placeholder.com/40/FF5733/FFFFFF', name: 'Alice Johnson', action: 'added a new project.', timestamp: '2 hours ago' },
  { id: '2', avatarUrl: 'https://via.placeholder.com/40/33FF57/FFFFFF', name: 'Bob Williams', action: 'commented on the task.', timestamp: '5 hours ago' },
  { id: '3', avatarUrl: 'https://via.placeholder.com/40/3357FF/FFFFFF', name: 'Charlie Brown', action: 'completed the report.', timestamp: 'Yesterday' },
  { id: '4', avatarUrl: 'https://via.placeholder.com/40/FF33A1/FFFFFF', name: 'Diana Prince', action: 'updated user permissions.', timestamp: '2 days ago' },
];

// --- Main Component ---

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 p-6`}>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {darkMode ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293a8 8 0 01-11.487 0l.001-.002a8 8 0 000 11.485l.001.002a8 8 0 0111.485 0l.001-.002zM20 9.5c0-.966-.055-1.92-.16-2.85-.342-2.504-1.604-4.662-3.474-6.532a10.923 10.923 0 00-2.987-2.689c.737.002 1.473.001 2.209.001zM17.59 4.794C12.952 7.836 10 11.254 10 15c0 2.846 1.038 5.577 2.907 7.828l.001.002a8 8 0 00-8.539 0l.001-.002A10.923 10.923 0 004.002 4.794 10.923 10.923 0 000 2 10 10 0 1117.59 4.794zM10 20a10 10 0 100-20 10 10 0 000 20z"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2V1A10 10 0 001.602 15.79a10 10 0 001.602 2.026 10 10 0 0012.797-1.067A10 10 0 007.196 1.001z"></path></svg>
          )}
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockKpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </main>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity Feed</h2>
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-700 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
            {mockActivityFeed.map((item) => (
              <ActivityFeedItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Placeholder for another component if needed, e.g., a chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hidden lg:block">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Insights</h2>
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">Placeholder for charts or detailed stats</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
```