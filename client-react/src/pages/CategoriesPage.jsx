import { Link } from 'react-router-dom';
import { FiMonitor, FiShoppingBag, FiHome, FiWatch } from 'react-icons/fi';

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Electronics',
      icon: <FiMonitor size={48} />,
      count: '1,234 products',
      desc: 'Mobile phones, laptops, and more',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10'
    },
    {
      name: 'Fashion',
      icon: <FiShoppingBag size={48} />,
      count: '856 products',
      desc: 'Clothing, shoes, and accessories',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/10'
    },
    {
      name: 'Home & Garden',
      icon: <FiHome size={48} />,
      count: '642 products',
      desc: 'Furniture, decor, and tools',
      color: 'from-cyan-500 to-teal-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/10'
    },
    {
      name: 'Accessories',
      icon: <FiWatch size={48} />,
      count: '421 products',
      desc: 'Watches, jewelry, and bags',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Browse Categories
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Explore our wide range of products organized by category to find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className={`group ${category.bgColor} rounded-3xl p-8 border border-white dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center`}
            >
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">{category.count}</p>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{category.desc}</p>
              <div className="mt-8 text-sm font-bold bg-white dark:bg-gray-800 px-6 py-2 rounded-full text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                Shop Category
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
