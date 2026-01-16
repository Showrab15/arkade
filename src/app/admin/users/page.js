"use client"

import { useEffect, useState } from 'react';
import { Shield, User, Mail } from 'lucide-react';
import { authService } from '@/services/authServices';
import AdminLayout from '@/app/components/AdminLayout';



export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    
    if (window.confirm(`Are you sure you want to ${newRole === 'admin' ? 'grant' : 'remove'} admin access for ${user.email}?`)) {
      try {
        await authService.updateUserRole(user.uid, newRole);
        await loadUsers();
      } catch (error) {
        console.error('Error updating user role:', error);
      }
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
          <Shield className="w-3 h-3" />
          <span>Admin</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
        <User className="w-3 h-3" />
        <span>User</span>
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">User Management</h1>
          <p className="text-gray-600">{users.length} registered users</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl">
                      {users.filter(u => u.role === 'admin').length}
                    </p>
                    <p className="text-sm text-gray-600">Admin Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl">
                      {users.filter(u => u.role === 'user').length}
                    </p>
                    <p className="text-sm text-gray-600">Regular Users</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                        Role
                      </th>
                      <th className="px-6 py-3 text-right text-xs uppercase tracking-wider text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.uid} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm">
                                {user.displayName || 'No Name'}
                              </p>
                              <p className="text-xs text-gray-500">ID: {user.uid}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => toggleAdminRole(user)}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                              user.role === 'admin'
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                            }`}
                          >
                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm mb-2">Role Management</h3>
              <p className="text-xs text-gray-600">
                Admins have full access to the admin panel including product management,
                analytics, and user management. Regular users can only view products and
                their own profile.
              </p>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
