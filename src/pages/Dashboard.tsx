import React, { useState } from 'react';

interface KpiCardProps { title: string; value: string; }
const KpiCard: React.FC<KpiCardProps> = ({ title, value }) => (
  <div className="p-4 bg-white rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={() => setDark(!dark)} className="px-4 py-2 rounded-lg border">
            {dark ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <KpiCard title="Revenue" value="$12,400" />
          <KpiCard title="Users"   value="3,210" />
          <KpiCard title="Uptime"  value="99.9%" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;