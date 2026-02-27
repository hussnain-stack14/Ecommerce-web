import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useProfileMutation } from '../redux/slices/usersApiSlice';
import { useUploadProductImageMutation } from '../redux/slices/uploadApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { BASE_URL } from '../redux/constants';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiSave, FiUpload } from 'react-icons/fi';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const [uploadProfileImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setImage(userInfo.image || '');
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
        image,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await uploadProfileImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-[70vh] py-12 animate-fadeIn">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8 text-center">
          <div className="relative inline-block mx-auto mb-6">
            {image ? (
               <img src={`${BASE_URL}${image}`} alt={name} className="w-32 h-32 rounded-full object-cover shadow-xl shadow-indigo-500/30 border-4 border-white dark:border-gray-800" />
            ) : (
               <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 text-4xl font-black uppercase border-4 border-white dark:border-gray-800">
                 {userInfo?.name?.charAt(0)}
               </div>
            )}
            <label className="absolute bottom-0 right-0 w-10 h-10 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <FiUpload />
              <input type="file" className="hidden" onChange={uploadFileHandler} disabled={loadingUpload} />
            </label>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">Update your account details and password</p>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 dark:border-gray-800">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiUser />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Change Password</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FiLock />
                    </div>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FiLock />
                    </div>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all disabled:opacity-50 btn-ripple shadow-xl hover:shadow-indigo-500/25"
              >
                <FiSave /> {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
