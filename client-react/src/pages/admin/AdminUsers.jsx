import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/slices/usersApiSlice';
import { FiTrash2, FiShield, FiUser, FiX } from 'react-icons/fi';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

export default function AdminUsers() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAdmin) return null;

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
      toast.success('User deleted successfully');
      setDeleteConfirmId(null);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Manage Users</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">View and manage registered accounts</p>
        </div>

        {isLoading ? <Loader /> : error ? (
           <div className="text-red-500 bg-red-50 p-4 rounded-xl">{error.data?.message || error.error}</div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm uppercase font-bold tracking-wider">
                    <th className="p-4 pl-6 border-b border-gray-200 dark:border-gray-700 font-semibold">User</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Email</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Role</th>
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">Joined</th>
                    <th className="p-4 pr-6 border-b border-gray-200 dark:border-gray-700 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm font-medium">
                  {users?.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg uppercase">
                              {user.name.charAt(0)}
                           </div>
                           <span className="text-gray-900 dark:text-white font-bold">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                      <td className="p-4">
                        {user.isAdmin ? (
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-bold flex flex-row items-center gap-1 justify-start w-fit"><FiShield /> Admin</span>
                        ) : (
                           <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold flex flex-row items-center gap-1 justify-start w-fit"><FiUser /> User</span>
                        )}
                      </td>
                       <td className="p-4 text-gray-500 dark:text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {user._id !== userInfo._id && (
                             <button onClick={() => setDeleteConfirmId(user._id)} disabled={loadingDelete} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                               <FiTrash2 size={16} />
                             </button>
                          )}
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delete User?</h3>
                <button onClick={() => setDeleteConfirmId(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition"><FiX size={24} /></button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 font-medium">Are you sure you want to delete this user? This action cannot be undone.</p>
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
