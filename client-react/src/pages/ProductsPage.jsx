import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageSize: 'all' });

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Accessories'];

  // Filtering Logic
  let filteredProducts = data?.products || [];

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= min && (max ? p.price <= max : true)
    );
  }

  if (sort === 'lowest') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'highest') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'toprated') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {keyword ? `Search Results for "${keyword}"` : 'All Products'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 && 's'}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 shadow-sm"
            >
              {showFilters ? <FiX /> : <FiFilter />} Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-1 md:w-48 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 font-medium shadow-sm cursor-pointer"
            >
              <option value="">Sort by: Latest</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="toprated">Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiFilter className="text-indigo-500" /> Filters
                </h2>
                {(category || priceRange) && (
                  <button
                    onClick={() => { setCategory(''); setPriceRange(''); }}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase text-xs tracking-wider">
                  category
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${!category ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300 dark:border-gray-600 bg-transparent group-hover:border-indigo-400'}`}>
                      {!category && <FiX size={12} />}
                    </div>
                    <input type="radio" name="category" value="" className="hidden" checked={!category} onChange={() => setCategory('')} />
                    <span className={`text-sm ${!category ? 'text-indigo-600 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                      All Categories
                    </span>
                  </label>
                  {categories.map((c) => (
                    <label key={c} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${category === c ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300 dark:border-gray-600 bg-transparent group-hover:border-indigo-400'}`}>
                        {category === c && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input type="radio" name="category" value={c} className="hidden" checked={category === c} onChange={() => setCategory(c)} />
                      <span className={`text-sm ${category === c ? 'text-indigo-600 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase text-xs tracking-wider">
                  Price range
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Any Price', value: '' },
                    { label: 'Under $50', value: '0-50' },
                    { label: '$50 to $100', value: '50-100' },
                    { label: '$100 to $500', value: '100-500' },
                    { label: 'Over $500', value: '500-' },
                  ].map((p) => (
                    <label key={p.label} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border border-2 flex items-center justify-center transition-all ${priceRange === p.value ? 'border-indigo-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'}`}>
                        {priceRange === p.value && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />}
                      </div>
                      <input type="radio" name="priceRange" value={p.value} className="hidden" checked={priceRange === p.value} onChange={() => setPriceRange(p.value)} />
                      <span className={`text-sm ${priceRange === p.value ? 'text-indigo-600 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center font-medium border border-red-200 dark:border-red-800">
                {error?.data?.message || 'Error fetching products'}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="glass-card flex flex-col items-center justify-center py-24 px-4 rounded-3xl text-center border-dashed border-2">
                <FiSearch size={48} className="text-gray-300 dark:text-gray-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 max-w-sm mb-6">
                  We couldn't find anything matching your current filters. Try adjusting them or clearing some options.
                </p>
                <button
                  onClick={() => { setCategory(''); setPriceRange(''); setSearchParams({}); }}
                  className="px-6 py-2.5 rounded-xl border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 hover:text-white font-semibold transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
