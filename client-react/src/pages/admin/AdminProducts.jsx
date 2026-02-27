import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../redux/slices/productsApiSlice';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

export default function AdminProducts() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageSize: 'all' });
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAdmin) return null;

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      refetch();
      toast.success('Product deleted successfully');
      setDeleteConfirmId(null);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new sample product?')) {
      try {
        const newProduct = await createProduct().unwrap();
        toast.success('Product created successfully!');
        if (window.confirm('Product created! Do you want to edit it now?')) {
          navigate(`/admin/products/${newProduct._id}`);
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Manage Products</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Create, update, and manage your inventory</p>
          </div>
          <button
            onClick={createProductHandler}
            disabled={loadingCreate}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            <FiPlus /> {loadingCreate ? 'Creating...' : 'Create Product'}
          </button>
        </div>

        {isLoading ? <Loader /> : error ? (
           <div className="text-red-500 bg-red-50 p-4 rounded-xl">{error.data?.message || error.error}</div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm uppercase font-bold tracking-wider">
                    <th className="p-4 pl-6 font-semibold border-b border-gray-200 dark:border-gray-700">Image</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Name</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Price</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Category</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Stock</th>
                    <th className="p-4 pr-6 font-semibold border-b border-gray-200 dark:border-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm font-medium">
                  {data?.products?.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 pl-6">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      </td>
                      <td className="p-4 text-gray-900 dark:text-white max-w-xs truncate">{product.name}</td>
                      <td className="p-4 text-gray-900 dark:text-white font-bold">${product.price.toFixed(2)}</td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">{product.category}</td>
                      <td className="p-4">
                        {product.countInStock > 0 ? (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">{product.countInStock} units</span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-bold">Out of stock</span>
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/products/${product._id}`} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 rounded-lg transition-colors">
                            <FiEdit size={16} />
                          </Link>
                          <button onClick={() => setDeleteConfirmId(product._id)} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" disabled={loadingDelete}>
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl scale-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delete Product?</h3>
                <button onClick={() => setDeleteConfirmId(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition"><FiX size={24} /></button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 font-medium">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                <button onClick={() => deleteHandler(deleteConfirmId)} disabled={loadingDelete} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition disabled:opacity-50">Delete</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
