import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiPackage, FiUsers, FiShoppingBag, FiDollarSign, FiSettings } from 'react-icons/fi';
import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import { useGetUsersQuery } from '../../redux/slices/usersApiSlice';
import Loader from '../../components/Loader';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({ pageSize: 'all' });
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

  useEffect(() => {
    setMounted(true);
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!mounted || !userInfo || !userInfo.isAdmin) return null;

  if (ordersLoading || productsLoading || usersLoading) return <Loader />;

  const totalRevenue = ordersData?.reduce((acc, order) => acc + (order.totalPrice || 0), 0) || 0;
  const totalOrders = ordersData?.length || 0;
  const totalProducts = productsData?.products?.length || 0;
  const totalUsers = usersData?.length || 0;

  const stats = [
    { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: <FiDollarSign />, color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50' },
    { title: 'Total Orders', value: totalOrders.toLocaleString(), icon: <FiShoppingBag />, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
    { title: 'Total Products', value: totalProducts.toLocaleString(), icon: <FiPackage />, color: 'from-cyan-500 to-teal-500', bg: 'bg-cyan-50' },
    { title: 'Total Users', value: totalUsers.toLocaleString(), icon: <FiUsers />, color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50' },
  ];

  const quickLinks = [
    { name: 'Manage Products', href: '/admin/products', icon: <FiPackage /> },
    { name: 'Manage Orders', href: '/admin/orders', icon: <FiShoppingBag /> },
    { name: 'Manage Users', href: '/admin/users', icon: <FiUsers /> },
    { name: 'Settings', href: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back, <span className="font-bold text-gray-900 dark:text-white">{userInfo.name}</span>!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-2xl mb-4 shadow-md`}>
                {stat.icon}
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-semibold mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.href} className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
