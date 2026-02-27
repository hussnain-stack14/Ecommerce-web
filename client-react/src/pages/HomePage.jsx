import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function HomePage() {
  const { data, isLoading, error } = useGetProductsQuery({ pageSize: 4 });

  return (
    <div className="animate-fadeIn">
      <Hero />
      <FeaturedCategories />

      {/* Featured Products Section */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Trending Now
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Discover our most popular products this week
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
            >
              View All Products <FiArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center font-medium max-w-2xl mx-auto border border-red-200 dark:border-red-800">
              {error?.data?.message || 'Something went wrong loading products. Please try again.'}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data?.products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              <Link
                to="/products"
                className="mt-12 sm:hidden flex items-center justify-center gap-2 w-full py-4 text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
              >
                View All Products <FiArrowRight />
              </Link>
            </>
          )}
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </div>
  );
}
