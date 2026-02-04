// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import {
//   LayoutDashboard,
//   Package,
//   BarChart3,
//   Users,
//   Menu,
//   X,
//   LogOut,
//   ShoppingBag
// } from 'lucide-react';
// import { useAuth } from '@/context/AuthContext';

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname(); // Next.js replacement for useLocation
//   const router = useRouter();     // Next.js replacement for useNavigate
//   const { logout, user } = useAuth();

//   const handleLogout = async () => {
//     await logout();
//     router.push('/'); // navigate to homepage
//   };

//   const menuItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
//     { icon: Package, label: 'Products', path: '/admin/products' },
//     { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
//     { icon: Users, label: 'Users', path: '/admin/users' }
//   ];

//   const isActive = (path) => pathname === path;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Header */}
//       <div className="md:hidden bg-white border-b border-gray-200  py-3 flex items-center justify-between sticky top-0 z-40">
//         <div className="px-6 flex items-center space-x-2">
//           <ShoppingBag className="w-6 h-6" />
//           <span className="text-lg tracking-tight">ARCADE Admin</span>
//         </div>
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       <div className="flex ">
//         {/* Sidebar - Desktop */}
//         <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
//           {/* Logo */}
//           <div className="px-4 py-4 border-b border-gray-200">
//             <div className="flex items-center space-x-2">
//               <ShoppingBag className="w-6 h-6" />
//               <span className="text-lg font-semibold">ARCADE Admin</span>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 py-4 px-4">
//             <ul className="space-y-2">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const active = isActive(item.path);

//                 return (
//                   <li key={item.path}>
//                     <Link
//                       href={item.path}
//                       className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
//                         active
//                           ? 'bg-black text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>

//           {/* User Info & Logout */}
//           <div className="flex-1 p-4 border-t border-gray-200">
//             <div className="mb-3 px-4">
//               <p className="text-sm text-gray-500">Logged in as</p>
//               <p className="text-sm truncate">{user?.email}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <LogOut className="w-5 h-5" />
//               <span>Logout</span>
//             </button>
//             <Link
//               href="/"
//               className="w-full flex items-center justify-center mt-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
//             >
//               View Website
//             </Link>
//           </div>
//         </aside>

//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div
//             className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <aside
//               className="w-64 bg-white h-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Navigation */}
//               <nav className="p-4">
//                 <ul className="space-y-2">
//                   {menuItems.map((item) => {
//                     const Icon = item.icon;
//                     const active = isActive(item.path);

//                     return (
//                       <li key={item.path}>
//                         <Link
//                           href={item.path}
//                           onClick={() => setSidebarOpen(false)}
//                           className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
//                             active
//                               ? 'bg-black text-white'
//                               : 'text-gray-700 hover:bg-gray-100'
//                           }`}
//                         >
//                           <Icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </nav>

//               <div className="p-4 border-t border-gray-200">
//                 <div className="mb-3 px-4">
//                   <p className="text-sm text-gray-500">Logged in as</p>
//                   <p className="text-sm truncate">{user?.email}</p>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </aside>
//           </div>
//         )}

//         {/* Main Content */}
//         <main className="flex-1 min-h-screen">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
