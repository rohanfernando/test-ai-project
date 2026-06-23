```typescript
import React, { useState } from 'react';

// Dummy data for KPI cards
const kpiData = [
  { title: 'Total Revenue', value: '$120,500', change: '+5.2%' },
  { title: 'New Users', value: '1,520', change: '+2.1%' },
  { title: 'Orders Completed', value: '875', change: '-1.0%' },
  { title: 'Conversion Rate', value: '4.8%', change: '+0.5%' },
];

// Dummy data for activity feed
const activityFeedData = [
  { id: 1, user: 'Alice Johnson', action: 'updated a task', timestamp: '2 hours ago', color: 'blue-500' },
  { id: 2, user: 'Bob Williams', action: 'created a new project', timestamp: '5 hours ago', color: 'green-500' },
  { id: 3, user: 'Charlie Brown', action: 'left a comment', timestamp: '1 day ago', color: 'yellow-500' },
  { id: 4, user: 'Diana Davis', action: 'completed a goal', timestamp: '2 days ago', color: 'purple-500' },
  { id: 5, user: 'Ethan Miller', action: 'assigned a task', timestamp: '3 days ago', color: 'red-500' },
];

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change }) => {
  const isPositive = !change.startsWith('-');
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  user: string;
  action: string;
  timestamp: string;
  color: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, timestamp, color }) => {
  return (
    <li className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className={`w-10 h-10 rounded-full bg-${color} flex items-center justify-center mr-4`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      </div>
      <div className="flex-1">
        <p className="text-gray-900 dark:text-white">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{timestamp}</p>
      </div>
    </li>
  );
};

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 p-8`}>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KpiCard key={index} title={kpi.title} value={kpi.value} change={kpi.change} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {activityFeedData.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  user={activity.user}
                  action={activity.action}
                  timestamp={activity.timestamp}
                  color={activity.color}
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