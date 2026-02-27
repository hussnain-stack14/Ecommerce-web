import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/slices/productsApiSlice';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand || '');
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  if (!userInfo || !userInfo.isAdmin) return null;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/admin/products" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:-translate-x-1 transition-transform bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
          <FiArrowLeft /> Back to Products
        </Link>

        {isLoading ? <Loader /> : error ? (
           <div className="text-red-500 bg-red-50 p-4 rounded-xl">{error.data?.message || error.error}</div>
        ) : (
          <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 dark:border-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Edit Product</h1>
            
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
                    <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white cursor-pointer">
                      <option value="">Select category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Count in Stock</label>
                    <input type="number" min="0" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                  </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white resize-y"></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                 <button
                    type="submit"
                    disabled={loadingUpdate}
                    className="flex justify-center flex-1 sm:flex-none sm:w-auto items-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    <FiSave /> {loadingUpdate ? 'Saving...' : 'Save Product'}
                  </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
