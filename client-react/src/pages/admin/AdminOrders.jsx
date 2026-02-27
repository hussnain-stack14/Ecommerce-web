import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery, useDeliverOrderMutation } from '../../redux/slices/ordersApiSlice';
import { FiCheck, FiX, FiPackage, FiEye } from 'react-icons/fi';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

export default function AdminOrders() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAdmin) return null;

  const deliverHandler = async (orderId) => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Manage Orders</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Track and manage all customer orders in one place</p>
        </div>

        {isLoading ? <Loader /> : error ? (
           <div className="text-red-500 bg-red-50 p-4 rounded-xl">{error.data?.message || error.error}</div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm uppercase font-bold tracking-wider">
                    <th className="p-4 pl-6 border-b border-gray-200 dark:border-gray-700 font-semibold">Order ID</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">User</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Date</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Total</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Paid</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Delivered</th>
                    <th className="p-4 pr-6 border-b border-gray-200 dark:border-gray-700 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm font-medium">
                  {orders?.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 pl-6 text-indigo-600 dark:text-indigo-400 font-bold font-mono">#{order._id.substring(0, 8)}</td>
                      <td className="p-4 text-gray-900 dark:text-white capitalize">{order.user?.name || 'N/A'}</td>
                      <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-gray-900 dark:text-white font-bold">${order.totalPrice.toFixed(2)}</td>
                      <td className="p-4">
                        {order.isPaid ? (
                          <div className="flex flex-col gap-1 items-start">
                             <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-1"><FiCheck /> Paid</span>
                             <span className="text-[10px] text-gray-400">{order.paidAt.substring(0, 10)}</span>
                          </div>
                        ) : (
                           <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-bold flex flex-row items-center gap-1 justify-start w-fit"><FiX /> Unpaid</span>
                        )}
                      </td>
                      <td className="p-4">
                        {order.isDelivered ? (
                           <div className="flex flex-col gap-1 items-start">
                             <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-1"><FiCheck /> Delivered</span>
                             <span className="text-[10px] text-gray-400">{order.deliveredAt.substring(0, 10)}</span>
                          </div>
                        ) : (
                           <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold flex flex-row items-center gap-1 justify-start w-fit"><FiPackage /> Pending</span>
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {!order.isDelivered && (
                            <button onClick={() => deliverHandler(order._id)} disabled={loadingDeliver} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Mark as delivered">
                              <FiPackage size={16} />
                            </button>
                          )}
                          <Link to={`/orders/${order._id}`} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View details">
                            <FiEye size={16} />
                          </Link>
                        </div>
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
