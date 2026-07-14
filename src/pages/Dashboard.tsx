```tsx
import React, { useState } from 'react';

// --- Sub-components ---

interface KPIValueProps {
  value: string | number;
  label: string;
}

const KPIValue: React.FC<KPIValueProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, description, time }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{description}</p>
    </div>
    <div className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
      {time}
    </div>
  </div>
);

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  React.useEffect(() => {
    const root = window.document.documentElement;
    const oldTheme = isDarkMode ? 'light' : 'dark';
    root.classList.remove(oldTheme);
    const newTheme = isDarkMode ? 'dark' : 'light';
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ backgroundColor: isDarkMode ? '#4A5568' : '#6366F1' }} // Darker gray or Indigo
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* KPI Card 1 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <KPIValue value="1,234" label="Total Users" />
        </div>
        {/* KPI Card 2 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <KPIValue value="$56,789" label="Revenue" />
        </div>
        {/* KPI Card 3 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <KPIValue value="98.7%" label="Conversion Rate" />
        </div>
        {/* KPI Card 4 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <KPIValue value="321" label="New Orders" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed - Col 1 */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Feed</h2>
          <div className="space-y-4">
            <ActivityItem
              icon={<div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2"><svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h1a2 2 0 002 2h1a2 2 0 002-2h1a2 2 0 002-2v-6a2 2 0 00-2-2H9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19v-6a2 2 0 00-2-2H13a2 2 0 00-2 2v6a2 2 0 002 2h1a2 2 0 002-2h1a2 2 0 002-2z"></path></svg></div>}
              title="New Project Started"
              description="Project Alpha has been initiated with a 30-day deadline."
              time="2 min ago"
            />
            <ActivityItem
              icon={<div className="bg-green-100 dark:bg-green-900 rounded-full p-2"><svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>}
              title="Task Completed"
              description="Completed the user authentication module for Beta."
              time="15 min ago"
            />
            <ActivityItem
              icon={<div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2"><svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v1.005l-1 .005a2 2 0 01-2 2H8a2 2 0 01-2-2l-.005-2a2 2 0 012-2h1V15a2 2 0 002-2h3a2 2 0 002 2v1a2 2 0 002 2h1a2 2 0 002-2v-.005a2 2 0 00-1-1.995H15m-1-2H14a2 2 0 00-2 2v1"></path></svg></div>}
              title="Scheduled Meeting"
              description="Meeting with the design team about UI improvements at 3 PM."
              time="1 hour ago"
            />
            <ActivityItem
              icon={<div className="bg-red-100 dark:bg-red-900 rounded-full p-2"><svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v10l9-11h-7z"></path></svg></div>}
              title="System Alert"
              description="High disk usage detected on server 3. Investigating."
              time="3 hours ago"
            />
          </div>
        </div>

        {/* Placeholder for other widgets or a smaller section - Col 2 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Active Users</span>
              <span className="font-semibold text-gray-900 dark:text-white">542</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Tasks Pending</span>
              <span className="font-semibold text-gray-900 dark:text-white">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Messages Unread</span>
              <span className="font-semibold text-gray-900 dark:text-white">7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```