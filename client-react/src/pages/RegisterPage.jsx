import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registration successful');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 dark:text-white bg-white dark:bg-gray-950">
      
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 dark:bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-600/20 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/30 blur-[120px] rounded-full z-0 pointer-events-none"></div>
        
        <div className="relative z-10 p-12 max-w-lg text-center animate-fadeIn">
          <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-8 transform rotate-12 transition-transform duration-500 hover:rotate-0">
            <span className="text-4xl font-black bg-gradient-to-br from-purple-500 to-pink-600 bg-clip-text text-transparent">E</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-6">Join the Community</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Create an account to track your orders, save your favorite items, and checkout faster. Everything you need, all in one place.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 animate-fadeIn">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden text-center">
             <Link to="/" className="inline-block text-3xl font-extrabold mb-2">
               <span className="gradient-text">Eco</span>Shop
             </Link>
          </div>

          <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Join us today! Please fill in your details.</p>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiUser />
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600 dark:hover:bg-purple-500 dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl hover:shadow-purple-500/25 mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center text-gray-600 dark:text-gray-400 font-medium">
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
