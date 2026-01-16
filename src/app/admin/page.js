"use client"

import { useEffect, useState } from 'react';
import { Package, TrendingUp, Users, Eye } from 'lucide-react';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import { analyticsService } from '@/services/analyticsServices';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  const { products } = useProducts();
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

  const stats = [
    {
      icon: Users,
      label: 'Total Visitors',
      value: analytics?.totalVisitors || 0,
      change: '+12.5%',
      color: 'bg-blue-500'
    },
    {
      icon: Eye,
      label: 'Product Views',
      value: analytics?.totalProductViews || 0,
      change: '+8.2%',
      color: 'bg-green-500'
    },
    {
      icon: Package,
      label: 'Total Products',
      value: products.length,
      change: '+3',
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'Registered Users',
      value: analytics?.totalUsers || 0,
      change: '+24',
      color: 'bg-orange-500'
    }
  ];

  const topProducts = analytics?.topProducts || [];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your store performance</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                    <p className="text-2xl md:text-3xl mb-1">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg mb-4">Top Viewed Products</h2>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg text-gray-400">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="text-sm">{product.title}</p>
                          <p className="text-xs text-gray-500">
                            {product.views} views
                          </p>
                        </div>
                      </div>
                      <div className="h-12 w-20 bg-gray-100 rounded flex items-center justify-center">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <a
                    href="/admin/products"
                    className="block w-full py-3 px-4 bg-black text-white rounded-lg text-center hover:bg-gray-800 transition-colors"
                  >
                    Add New Product
                  </a>
                  <a
                    href="/admin/analytics"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
                  >
                    View Analytics
                  </a>
                  <a
                    href="/admin/users"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
                  >
                    Manage Users
                  </a>
                  <Link
                    href="/"
                    className="block w-full py-3 px-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
                  >
                    View Website
                  </Link>
                </div>
              </div>
            </div>

            {/* Future Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <h3 className="text-sm mb-2 text-gray-600">Orders</h3>
                <p className="text-xs text-gray-500">Coming Soon</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <h3 className="text-sm mb-2 text-gray-600">Inventory</h3>
                <p className="text-xs text-gray-500">Coming Soon</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <h3 className="text-sm mb-2 text-gray-600">Notifications</h3>
                <p className="text-xs text-gray-500">Coming Soon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
