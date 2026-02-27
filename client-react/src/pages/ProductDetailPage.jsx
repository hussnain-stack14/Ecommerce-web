import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../redux/slices/productsApiSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import { FiStar, FiShoppingCart, FiArrowLeft, FiMinus, FiPlus, FiCheckCircle, FiShield, FiTruck } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeImage, setActiveImage] = useState(0); // For gallery if multiple

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId: id,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="min-h-screen pt-20"><Loader /></div>;

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-xl mx-auto bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">{error?.data?.message || 'Error loading product details'}</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
            <FiArrowLeft /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Simulate multiple images for gallery effect
  const images = [product.image, product.image, product.image];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb / Back */}
        <Link to="/products" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:-translate-x-1 transition-transform bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
          <FiArrowLeft /> Back to Products
        </Link>

        {/* Product Top */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Images Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-indigo-500 opacity-100 ring-4 ring-indigo-500/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wider uppercase mb-4">
              {product.category}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'} />
                ))}
              </div>
              <span className="text-gray-500 font-medium">{product.numReviews} reviews</span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                <FiCheckCircle /> Verified Product
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Price</div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white">${product.price}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-gray-500 text-sm font-medium mb-1">Status</div>
                  {product.countInStock > 0 ? (
                    <div className="text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full inline-block">
                      In Stock ({product.countInStock})
                    </div>
                  ) : (
                    <div className="text-red-600 dark:text-red-400 font-bold bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full inline-block">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>

              {product.countInStock > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-2 w-full sm:w-32 h-14">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <FiMinus />
                    </button>
                    <span className="font-bold text-gray-900 dark:text-white w-8 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(q => Math.min(product.countInStock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <button
                    onClick={addToCartHandler}
                    className="flex-1 flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all btn-ripple"
                  >
                    <FiShoppingCart size={20} /> Add to Cart
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                  <FiTruck size={20} />
                </div>
                <span className="text-sm font-medium">Free Shipping<br/>Over $100</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                  <FiShield size={20} />
                </div>
                <span className="text-sm font-medium">1 Year<br/>Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-12">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Existing Reviews */}
            <div className="lg:col-span-7 space-y-8">
              {product.reviews.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl text-center border-dashed border-2 border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Be the first to share your thoughts on this product!</p>
                </div>
              ) : (
                product.reviews.map((review) => (
                  <div key={review._id} className="bg-white dark:bg-gray-900/50 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={14} className={i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4 border-t border-gray-50 dark:border-gray-800">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review */}
            <div className="lg:col-span-5">
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl sticky top-24 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Write a Review</h3>
                
                {userInfo ? (
                  <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Rating
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none font-medium text-gray-700 dark:text-gray-300"
                      >
                        <option value="">Select a rating...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Review
                      </label>
                      <textarea
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        placeholder="What do you think about this product?"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none font-medium text-gray-700 dark:text-gray-300 placeholder-gray-400"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loadingProductReview}
                      className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingProductReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl text-center">
                    <p className="text-indigo-800 dark:text-indigo-300 font-medium mb-4">
                      Please login to write a review
                    </p>
                    <Link
                      to={`/login?redirect=/products/${id}`}
                      className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
                    >
                      Login Now
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
