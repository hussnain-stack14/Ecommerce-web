import { Link } from 'react-router-dom';
import { FiClock, FiShoppingBag } from 'react-icons/fi';

export default function DealsPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-[70vh] flex flex-col items-center justify-center p-4 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto glass-card p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-indigo-500/30">
          <FiClock size={40} className="animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Special Deals
        </h1>
        
        <div className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-bold rounded-full text-sm mb-6 uppercase tracking-widest">
          Coming Soon
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          We're brewing up some amazing deals and discounts just for you. Check back soon for exclusive offers on your favorite products!
        </p>

        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all hover:shadow-lg hover:-translate-y-1"
        >
          <FiShoppingBag /> Shop Regular Items Now
        </Link>
      </div>
    </div>
  );
}
