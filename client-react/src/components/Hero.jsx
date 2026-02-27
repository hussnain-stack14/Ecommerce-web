import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrendingUp, FiAward } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 overflow-hidden py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Content */}
        <div className="flex-1 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Discover Premium Products at
            <span className="gradient-text"> Unbeatable Prices</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            Shop the latest trends in electronics, fashion, and home goods. Quality guaranteed with fast, free shipping on all orders over $100.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-xl hover:-translate-y-1 transition-all btn-ripple"
            >
              <FiShoppingBag /> Shop Now
            </Link>
            <Link
              to="/deals"
              className="px-7 py-3.5 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
              View Deals
            </Link>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { icon: FiShoppingBag, title: '10,000+ Products', sub: 'Wide selection' },
              { icon: FiTrendingUp, title: 'Best Prices', sub: 'Guaranteed savings' },
              { icon: FiAward, title: 'Top Quality', sub: 'Premium products' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Cards */}
        <div className="flex-1 relative min-h-[350px] hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <div className="relative w-full h-[400px]">
            {[
              { emoji: '🎧', name: 'Headphones', price: '$89.99', pos: 'top-[10%] left-[5%]', delay: '0s' },
              { emoji: '📱', name: 'Smartphones', price: '$599.99', pos: 'top-[45%] right-[5%]', delay: '0.5s' },
              { emoji: '⌚', name: 'Smartwatch', price: '$199.99', pos: 'bottom-[10%] left-[15%]', delay: '1s' },
            ].map(({ emoji, name, price, pos, delay }) => (
              <div
                key={name}
                className={`absolute ${pos} glass-card px-5 py-4 rounded-2xl flex items-center gap-4 shadow-xl animate-float`}
                style={{ animationDelay: delay }}
              >
                <span className="text-3xl">{emoji}</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">{name}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold">{price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
