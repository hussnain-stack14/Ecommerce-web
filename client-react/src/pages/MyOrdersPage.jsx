import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../redux/slices/ordersApiSlice';
import { FiPackage, FiCheckCircle, FiClock, FiEye, FiSearch } from 'react-icons/fi';
import Loader from '../components/Loader';

export default function MyOrdersPage() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
             <FiPackage className="text-indigo-500" /> My Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">View and track your previous orders</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200">{error?.data?.message || 'Failed to load orders'}</div>
        ) : orders.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center py-20 px-4 rounded-3xl text-center shadow-sm">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-6">
              <FiSearch size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No orders found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">You haven't placed any orders yet. Start shopping to see your purchase history here.</p>
            <Link to="/products" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">Start Shopping</Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm uppercase font-bold tracking-wider">
                    <th className="p-4 pl-6 border-b border-gray-200 dark:border-gray-700 font-semibold">Order ID</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Date</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Total</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Paid</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Delivered</th>
                    <th className="p-4 pr-6 border-b border-gray-200 dark:border-gray-700 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm font-medium">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 pl-6 text-gray-900 dark:text-white font-mono">#{order._id.substring(0, 8)}</td>
                      <td className="p-4 text-gray-500">{order.createdAt.substring(0, 10)}</td>
                      <td className="p-4 text-gray-900 dark:text-white font-bold">${order.totalPrice.toFixed(2)}</td>
                      <td className="p-4">
                        {order.isPaid ? (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><FiCheckCircle /> Yes</span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500"><FiClock /> No</span>
                        )}
                      </td>
                      <td className="p-4">
                        {order.isDelivered ? (
                           <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><FiCheckCircle /> Yes</span>
                        ) : (
                           <span className="flex items-center gap-1 text-amber-500"><FiClock /> Pending</span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <Link to={`/orders/${order._id}`} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white font-semibold rounded-lg transition-colors">
                          <FiEye /> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
