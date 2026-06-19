```typescript
import React, { useState } from 'react';

// Define types for KPI data if needed, e.g.:
// type KpiData = { label: string; value: string; change?: string };

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sample data for KPI cards
  const kpiData = [
    { label: 'Total Sales', value: '$120,567' },
    { label: 'New Customers', value: '452' },
    { label: 'Conversion Rate', value: '7.8%' },
    { label: 'Average Order Value', value: '$85.20' },
  ];

  // Sample data for activity feed
  const activityFeed = [
    { id: 1, message: 'New order placed by John Doe.', time: '2 hours ago', icon: '🛒' },
    { id: 2, message: 'User Jane Smith updated their profile.', time: '5 hours ago', icon: '👤' },
    { id: 3, message: 'Product X reached out of stock.', time: '1 day ago', icon: '📦' },
    { id: 4, message: 'Support ticket #1234 resolved.', time: '2 days ago', icon: '✅' },
  ];

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen p-6 transition-colors duration-300`}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-yellow-400 text-gray-800' : 'bg-gray-700 text-white'} hover:bg-opacity-80 transition-colors`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* KPI Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className="text-lg font-semibold mb-2">{kpi.label}</h3>
              <p className="text-3xl font-bold">{kpi.value}</p>
              {kpi.change && (
                <span className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
          <ul>
            {activityFeed.map((item) => (
              <li key={item.id} className="flex items-start mb-4 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="mr-4 text-2xl">{item.icon}</div>
                <div>
                  <p className="font-medium">{item.message}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```