import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-700">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        {product.countInStock === 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            Out of Stock
          </div>
        )}
        <button
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm"
          aria-label="Add to wishlist"
        >
          <FiHeart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link
          to={`/products/${product._id}`}
          className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {product.name}
        </Link>

        <div className="mt-1 text-xs text-indigo-500 dark:text-indigo-400 font-medium">
          {product.category}
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
