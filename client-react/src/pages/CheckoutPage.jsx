import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} from '../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiChevronRight, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    }
  }, [userInfo, navigate]);

  // Shipping State
  const [address, setAddress] = useState(cart.shippingAddress?.address || '');
  const [city, setCity] = useState(cart.shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(cart.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(cart.shippingAddress?.country || '');

  // Payment State
  const [paymentMethod, setPaymentMethodState] = useState(cart.paymentMethod || 'PayPal');

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const submitShipping = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    setStep(2);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setStep(3);
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const steps = [
    { num: 1, title: 'Shipping', icon: FiMapPin },
    { num: 2, title: 'Payment', icon: FiCreditCard },
    { num: 3, title: 'Review', icon: FiCheckCircle },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Checkout Header & Stepper */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Secure Checkout</h1>
          
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Progress Bar Background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 rounded-full z-0"></div>
            {/* Active Progress */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive ? 'bg-indigo-500 border-white dark:border-gray-950 text-white shadow-lg shadow-indigo-500/30 scale-110' : isCompleted ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'}`}>
                    {isCompleted ? <FiCheck size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-sm font-bold ${isActive ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-800">
          
          {/* STEP 1: SHIPPING */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiMapPin className="text-indigo-500" /> Shipping Address
              </h2>
              <form onSubmit={submitShipping} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">City</label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
                      <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium" />
                  </div>
                </div>
                <div className="flex justify-end pt-6">
                  <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
                    Continue to Payment <FiChevronRight />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div className="animate-fadeIn">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiCreditCard className="text-indigo-500" /> Payment Method
              </h2>
              <form onSubmit={submitPayment} className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl cursor-pointer">
                    <input type="radio" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethodState(e.target.value)} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                    <span className="font-bold text-gray-900 dark:text-white text-lg">PayPal or Credit Card</span>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 cursor-pointer rounded-xl transition">
                    <input type="radio" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={(e) => setPaymentMethodState(e.target.value)} disabled className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 opacity-50" />
                    <span className="font-bold text-gray-400 text-lg flex items-center gap-2">Stripe <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Coming Soon</span></span>
                  </label>
                </div>
                
                <div className="flex justify-between pt-6">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-4 text-gray-600 dark:text-gray-400 font-bold hover:text-gray-900 dark:hover:text-white transition">Back</button>
                  <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
                    Review Order <FiChevronRight />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-indigo-500" /> Review Your Order
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><FiMapPin className="text-gray-400" /> Shipping Info</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><FiCreditCard className="text-gray-400" /> Payment Method</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {cart.paymentMethod}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold text-lg mb-4">Order Items ({cart.cartItems.length})</h3>
                    <div className="space-y-4">
                      {cart.cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-white" />
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</div>
                              <div className="text-sm text-gray-500">Qty: {item.qty}</div>
                            </div>
                          </div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            ${(item.qty * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 sticky top-24">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6 text-sm font-medium">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Items</span>
                        <span className="text-gray-900 dark:text-white">${cart.itemsPrice}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Shipping</span>
                        <span className="text-gray-900 dark:text-white">${cart.shippingPrice}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Tax</span>
                        <span className="text-gray-900 dark:text-white">${cart.taxPrice}</span>
                      </div>
                      <div className="border-t border-indigo-200 dark:border-indigo-800/50 pt-3 flex justify-between items-end mt-4">
                        <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">${cart.totalPrice}</span>
                      </div>
                    </div>

                    {cart.cartItems.length === 0 ? (
                      <p className="text-red-500 text-center text-sm font-bold">Your cart is empty</p>
                    ) : (
                      <button
                        onClick={placeOrderHandler}
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none"
                      >
                       {isLoading ? 'Processing...' : 'Place Order'}
                      </button>
                    )}
                    
                    <button type="button" onClick={() => setStep(2)} className="w-full mt-4 py-3 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-xl transition">
                      Back to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
