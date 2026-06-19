```tsx
import React, { useState } from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType }) => {
  const changeClasses = changeType === 'positive'
    ? 'text-green-500'
    : changeType === 'negative'
      ? 'text-red-500'
      : 'text-gray-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
      <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
      {change && (
        <p className={`text-sm font-semibold ${changeClasses}`}>
          {change}
        </p>
      )}
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, title, description, time }) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 space-x-4 transition-colors duration-300">
      <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300">
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="text-gray-900 dark:text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{description}</p>
        <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
      </div>
    </div>
  );
};

// --- Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 p-6 md:p-10`}>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* KPI Card Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Revenue" value="$12,345" change="+5.2%" changeType="positive" />
        <KpiCard title="New Customers" value="567" change="-1.1%" changeType="negative" />
        <KpiCard title="Orders" value="1,209" change="+10.5%" changeType="positive" />
        <KpiCard title="Average Order Value" value="$108.75" change="0.0%" />
      </section>

      {/* Activity Feed and potentially other content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity Feed</h2>
          <div className="-mx-6"> {/* Allow padding to reset for full-width items */}
            <ActivityFeedItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              title="New User Registered"
              description="A new user with email example@domain.com signed up."
              time="2 minutes ago"
            />
            <ActivityFeedItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-3.414a2 2 0 10-2.828-2.828L11 12.828 15.828 17.75z" /></svg>}
              title="Order Placed"
              description="Order #12345 for $150.99 has been successfully placed."
              time="15 minutes ago"
            />
            <ActivityFeedItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4 L19 7" /></svg>}
              title="Task Completed"
              description="The 'Refactor authentication' task was marked as complete."
              time="1 hour ago"
            />
             <ActivityFeedItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4-4 4v-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8l1-1z" /></svg>}
              title="New Message Received"
              description="You have received a new message from John Doe."
              time="3 hours ago"
            />
          </div>
        </section>

        {/* Placeholder for another section if needed, e.g., a chart or statistics */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Additional Content Area</p>
            <p className="text-sm">This space can be used for charts, summaries, or other widgets.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
```