import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 animate-fadeIn">
        <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-full flex items-center justify-center mb-6">
          <FiShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">Your Cart is Empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Discover our amazing products and start shopping!
        </p>
        <Link
          to="/products"
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all btn-ripple"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Shopping Cart
          <span className="text-indigo-500 ml-2">({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="glass-card flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                
                <Link to={`/products/${item._id}`} className="shrink-0 w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </Link>

                <div className="flex-1 w-full text-center sm:text-left">
                  <Link to={`/products/${item._id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <div className="text-gray-500 text-sm mt-1 mb-4">{item.category}</div>
                  <div className="text-xl font-black text-gray-900 dark:text-white">${item.price}</div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-2 w-32 h-12">
                    <button
                      onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="font-bold text-gray-900 dark:text-white w-8 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition"
                      disabled={item.qty >= item.countInStock}
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="w-12 h-12 flex items-center justify-center text-red-500 hover:text-white hover:bg-red-500 bg-red-50 dark:bg-red-500/10 rounded-xl transition-colors shrink-0"
                    title="Remove item"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-[400px] shrink-0">
            <div className="glass-card rounded-3xl p-8 sticky top-24 shadow-xl">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="text-gray-900 dark:text-white">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
                  <span>Tax Estimate</span>
                  <span className="text-gray-900 dark:text-white">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Estimated Total</span>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Proceed to Checkout <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="text-sm text-gray-500">Secure Checkout</span>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded rounded-sm flex items-center justify-center text-[8px] font-bold text-gray-500">VISA</div>
                  <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded rounded-sm flex items-center justify-center text-[8px] font-bold text-gray-500">MC</div>
                  <div className="w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded rounded-sm flex items-center justify-center text-[8px] font-bold text-gray-500">AMEX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
