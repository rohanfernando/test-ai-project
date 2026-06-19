```typescript
import React, { useState } from 'react';

// --- Sub-component: KPI Card ---
interface KpiCardProps {
  title: string;
  value: string;
  trend?: string; // e.g., "+5%" or "-2%"
  trendColor?: 'green' | 'red';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, trendColor }) => {
  const trendClass = trendColor === 'green' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="flex items-baseline justify-between mt-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <span className={`text-sm font-semibold ${trendClass}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Sub-component: Activity Feed Item ---
interface ActivityFeedItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, title, description, time }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 ml-4">{time}</span>
    </div>
  );
};

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // Effect to apply dark mode class to document body and manage localStorage
  React.useEffect(() => {
    const root = window.document.documentElement;
    const isDark = isDarkMode;

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white antialiased">
      <header className="bg-white dark:bg-gray-800 shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v-1M4.21 4.21l1.42 1.42m11.04 11.04l1.42-1.42M12 12a9 9 0 0118 0 9 9 0 01-18 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.21 1.74A10.06,10.06,0,0,0,0,12a10.06,10.06,0,0,0,12,10.06,10.06,10.06,0,0,0,8.38-12.744l-4.1,4.1" />
                <path d="M_20.354 15.354 A 9 9 0 0 1 8.21 1.74 A 10.06 10.06 0 0 0 0 12 A 10.06 10.06 0 0 0 12 22.06 A 10.06 10.06 0 0 0 20.354 15.354 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* KPI Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Total Revenue" value="$12,500" trend="+10%" trendColor="green" />
          <KpiCard title="New Users" value="3,450" trend="+5%" trendColor="green" />
          <KpiCard title="Orders" value="875" trend="-2%" trendColor="red" />
          <KpiCard title="Conversion Rate" value="3.75%" />
        </section>

        {/* Activity Feed */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <ActivityFeedItem
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 3h.01M6 12h.01M12 12h.01M19 12c0-1.33-0.47-20.87-2.011-2.011-1.098 0-1.487 0-1.362 0-1.282 0-1.505 8.852-2.489 8.852" /></svg>}
              title="New Order Placed"
              description="Order #10234 for $150.99 completed."
              time="5 mins ago"
            />
            <ActivityFeedItem
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              title="User Registered"
              description="New user 'AliceSmith' joined the platform."
              time="15 mins ago"
            />
            <ActivityFeedItem
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Payment Processed"
              description="Payment for invoice #INV789 received."
              time="30 mins ago"
            />
            <ActivityFeedItem
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Feature Update"
              description="New dashboard analytics feature released."
              time="1 hour ago"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
```