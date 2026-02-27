import { Link } from 'react-router-dom';
import { FiMonitor, FiShoppingBag, FiHome, FiWatch } from 'react-icons/fi';

export default function FeaturedCategories() {
  const categories = [
    {
      name: 'Electronics',
      icon: <FiMonitor size={32} />,
      count: '1,234 products',
      color: 'from-blue-500 to-indigo-600',
      bgHover: 'hover:shadow-blue-500/30'
    },
    {
      name: 'Fashion',
      icon: <FiShoppingBag size={32} />,
      count: '856 products',
      color: 'from-pink-500 to-rose-600',
      bgHover: 'hover:shadow-pink-500/30'
    },
    {
      name: 'Home & Garden',
      icon: <FiHome size={32} />,
      count: '642 products',
      color: 'from-cyan-500 to-teal-600',
      bgHover: 'hover:shadow-cyan-500/30'
    },
    {
      name: 'Accessories',
      icon: <FiWatch size={32} />,
      count: '421 products',
      color: 'from-emerald-500 to-green-600',
      bgHover: 'hover:shadow-emerald-500/30'
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our wide selection of categories to find exactly what you're looking for, from the latest tech to fashionable apparel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className={`group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${category.bgHover}`}
            >
              <div className={`w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
