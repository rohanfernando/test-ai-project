```tsx
import React, { useState } from 'react';

// --- KPI Card Component ---
interface KpiCardProps {
  title: string;
  value: string;
  trend?: string; // e.g., "+5%" or "-2%"
  trendColor?: 'green' | 'red';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, trendColor }) => {
  const trendClasses = {
    green: 'text-green-500',
    red: 'text-red-500',
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      {trend && (
        <span className={`text-sm font-medium ${trendColor ? trendColorClasses[trendColor] : ''}`}>
          {trend}
        </span>
      )}
    </div>
  );
};

// --- Activity Feed Item Component ---
interface ActivityFeedItemProps {
  icon: React.ReactNode;
  activity: string;
  time: string;
  details?: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, activity, time, details }) => {
  return (
    <div className="flex items-center space-x-3 py-3 border-b border-gray-700 last:border-b-0">
      <div className="flex-shrink-0 text-blue-400">{icon}</div>
      <div className="flex-grow">
        <p className="text-gray-300">{activity}</p>
        {details && <p className="text-sm text-gray-500">{details}</p>}
      </div>
      <span className="text-xs text-gray-500 flex-shrink-0">{time}</span>
    </div>
  );
};

// --- Dashboard Page Component ---
const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-6 md:p-10`}>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center space-x-2"
        >
          {isDarkMode ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 18v-1M4.21 4.21l1.414 1.414m14.142 14.142l1.414-1.414M12 7a7 7 0 100 14 7 7 0 000-14z"></path></svg>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 12.01A7.293 7.293 0 0016 12c0-4.01 3.175-7.293 7.006-7.293A7.293 7.293 0 0020.354 12z"></path></svg>
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </header>

      <main>
        {/* KPI Card Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Revenue" value="$150,000" trend="+10%" trendColor="green" />
            <KpiCard title="Customers" value="5,400" trend="+3%" trendColor="green" />
            <KpiCard title="Orders" value="1,250" trend="-1%" trendColor="red" />
            <KpiCard title="Conversion Rate" value="3.5%" />
          </div>
        </section>

        {/* Activity Feed */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <ActivityFeedItem
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-4a2 2 0 110-4 2 2 0 010 4z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-18 0 9 9 0 0118 0z"></path></svg>}
              activity="New user signed up"
              details="Username: JohnDoe123"
              time="2 minutes ago"
            />
            <ActivityFeedItem
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
              activity="Order #1056 completed"
              details="Customer: JaneSmith"
              time="15 minutes ago"
            />
            <ActivityFeedItem
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 3h.01M6 12h.01M12 15h.01M8 12h.01M14 12h.01M10 10h.01M16 10h.01M9 7h.01M15 7h.01M17 3h.01M7 3h.01"></path></svg>}
              activity="System maintenance started"
              time="30 minutes ago"
            />
            <ActivityFeedItem
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 10l5 5 5-5m-10 3v6a2 2 0 002 2h6a2 2 0 002-2v-6"></path></svg>}
              activity="New report generated"
              details="Monthly Sales Report"
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