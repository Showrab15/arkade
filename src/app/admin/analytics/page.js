
"use client"
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { analyticsService } from '@/services/analyticsServices';
import AdminLayout from '@/components/AdminLayout';

const COLORS = ['#000000', '#404040', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5'];

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      const data = await analyticsService.getAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Analytics</h1>
          <p className="text-gray-600">Detailed insights about your store</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Total Visitors</p>
            <p className="text-3xl mb-1">{analytics.totalVisitors.toLocaleString()}</p>
            <p className="text-sm text-green-600">↑ 12.5% from last week</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Product Views</p>
            <p className="text-3xl mb-1">{analytics.totalProductViews.toLocaleString()}</p>
            <p className="text-sm text-green-600">↑ 8.2% from last week</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Registered Users</p>
            <p className="text-3xl mb-1">{analytics.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-green-600">↑ 15.3% from last week</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visitors by Date */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg mb-4">Visitors This Week</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.visitorsByDate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="date" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ fill: '#000000', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Views by Category */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg mb-4">Views by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.viewsByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="category" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="views" fill="#000000" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={analytics.viewsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="views"
              >
                {analytics.viewsByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg mb-4">Top Performing Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Rank</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Product</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-600">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.topProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4 text-right">{product.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export as CSV
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export as PDF
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
