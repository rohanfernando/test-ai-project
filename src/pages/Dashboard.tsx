```typescript
import React, { useState } from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend }) => {
  const renderTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">▲</span>;
      case 'down':
        return <span className="text-red-500">▼</span>;
      case 'neutral':
        return <span className="text-gray-500">-</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 flex flex-col justify-between h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</span>
        {renderTrendIcon()}
      </div>
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, title, description, timestamp }) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
      <div className="flex-shrink-0 mr-4 text-gray-600 dark:text-gray-300">{icon}</div>
      <div className="flex-grow">
        <h4 className="font-medium text-gray-900 dark:text-gray-200">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

// --- Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-800`}>
      <nav className="bg-white dark:bg-gray-700 shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      <main className="p-6 md:p-8">
        {/* KPI Card Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Revenue" value="$1,250,000" trend="up" />
            <KpiCard title="New Users" value="15,600" trend="up" />
            <KpiCard title="Conversion Rate" value="2.75%" trend="down" />
            <KpiCard title="Avg. Order Value" value="$75.50" trend="neutral" />
          </div>
        </section>

        {/* Activity Feed and other content */}
        <section className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 bg-white dark:bg-gray-700 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Recent Activity</h2>
            <ActivityFeedItem
              icon={<span>🚀</span>}
              title="New Project Launched"
              description="The 'Nova' project was successfully deployed to production."
              timestamp="2 minutes ago"
            />
            <ActivityFeedItem
              icon={<span>👤</span>}
              title="New User Registered"
              description="User 'Alice Wonderland' has joined the platform."
              timestamp="15 minutes ago"
            />
            <ActivityFeedItem
              icon={<span>🛒</span>}
              title="Order Placed"
              description="Order #12345 was completed. Total: $150.00"
              timestamp="30 minutes ago"
            />
            <ActivityFeedItem
              icon={<span>⚙️</span>}
              title="System Update"
              description="Version 2.1.0 of the backend services deployed."
              timestamp="1 hour ago"
            />
          </div>

          <div className="lg:w-1/3 bg-white dark:bg-gray-700 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Summary</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This section can contain summary statistics, quick links, or other relevant information.
              It's designed to be a flexible area for additional dashboard elements.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Active Users</span>
                <span className="font-medium text-green-500">8,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Pending Tasks</span>
                <span className="font-medium text-yellow-500">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Server Load</span>
                <span className="font-medium text-blue-500">70%</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
```