import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery } from '../redux/slices/ordersApiSlice';
import Loader from '../components/Loader';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiCreditCard } from 'react-icons/fi';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  if (isLoading) return <div className="min-h-screen pt-20"><Loader /></div>;

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-xl mx-auto bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-200 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
          <p>{error?.data?.message || 'Error loading order details'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              Order Details
            </h1>
            <p className="text-gray-500 mt-2 font-mono text-sm bg-gray-200 dark:bg-gray-800 inline-block px-3 py-1 rounded-md">
              Order ID: #{order._id}
            </p>
            <p className="text-sm mt-3 font-medium text-gray-600 dark:text-gray-400">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {order.isPaid ? (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold border border-green-200 dark:border-green-800">
                <FiCheckCircle size={16} /> Paid
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-bold border border-amber-200 dark:border-amber-800">
                <FiClock size={16} /> Not Paid
              </div>
            )}
            
            {order.isDelivered ? (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-bold border border-indigo-200 dark:border-indigo-800">
                <FiCheckCircle size={16} /> Delivered
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold border border-gray-300 dark:border-gray-700">
                <FiTruck size={16} /> Processing
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping & Payment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                 <FiMapPin className="text-indigo-500" /> Shipping Info
                </h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-1 font-medium">
                  <p className="text-gray-900 dark:text-white">{order.user.name}</p>
                  <p>{order.user.email}</p>
                  <p className="mt-2">{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                {order.isDelivered ? (
                  <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-bold flex items-center gap-2">
                    <FiCheckCircle /> Delivered on {order.deliveredAt.substring(0, 10)}
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-xl text-sm font-bold flex items-center gap-2">
                    <FiTruck /> Preparing for shipment
                  </div>
                )}
              </div>

              <div className="glass-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                 <FiCreditCard className="text-indigo-500" /> Payment Info
                </h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-1 font-medium">
                  <p>Method: <span className="text-gray-900 dark:text-white">{order.paymentMethod}</span></p>
                </div>
                {order.isPaid ? (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-sm font-bold flex items-center gap-2">
                    <FiCheckCircle /> Paid on {order.paidAt.substring(0, 10)}
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-900/50">
                    <FiClock /> Awaiting Payment
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <FiPackage className="text-indigo-500" /> Order Items
              </h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover bg-white shadow-sm" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white mb-1">{item.name}</div>
                        <div className="text-sm text-gray-500 font-medium">Qty: {item.qty} × ${item.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="font-black text-lg text-gray-900 dark:text-white sm:text-right">
                      ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-8 sticky top-24 shadow-xl border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                  <span>Items</span>
                  <span className="text-gray-900 dark:text-white">${order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                  <span>Shipping</span>
                  <span className="text-gray-900 dark:text-white">${order.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                  <span>Tax</span>
                  <span className="text-gray-900 dark:text-white">${order.taxPrice.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {!order.isPaid && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 text-center font-bold">
                  Payment functionality to be integrated (PayPal/Stripe)
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
