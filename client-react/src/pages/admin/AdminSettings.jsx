import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiSave, FiSettings, FiGlobe, FiLock } from 'react-icons/fi';

export default function AdminSettings() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    storeName: 'EcoShop',
    supportEmail: 'support@ecoshop.com',
    currency: 'USD',
    taxRate: 10,
    maintenanceMode: false,
    allowReviews: true,
    orderEmails: true
  });

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAdmin) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoading(false);
    toast.success('Settings updated successfully');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Store Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your store configuration and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            
          {/* General Information */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiSettings className="text-indigo-500" /> General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
                  <input type="text" name="storeName" value={settings.storeName} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Support Email</label>
                  <input type="email" name="supportEmail" value={settings.supportEmail} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                </div>
            </div>
          </div>

          {/* Localization */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiGlobe className="text-indigo-500" /> Localization & Tax
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                  <select name="currency" value={settings.currency} onChange={handleChange} className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white cursor-pointer">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label>
                  <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} min="0" max="100" step="0.1" className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-900 dark:text-white" />
                </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiLock className="text-indigo-500" /> System Preferences
            </h2>
            <div className="space-y-6">
               <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                 <div>
                    <span className="font-bold text-gray-900 dark:text-white block">Maintenance Mode</span>
                    <span className="text-sm text-gray-500">Temporarily disable the storefront</span>
                 </div>
                 <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only" />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                 </div>
               </label>
               
               <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                 <div>
                    <span className="font-bold text-gray-900 dark:text-white block">Allow Product Reviews</span>
                    <span className="text-sm text-gray-500">Customers can leave reviews on products</span>
                 </div>
                 <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.allowReviews ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <input type="checkbox" name="allowReviews" checked={settings.allowReviews} onChange={handleChange} className="sr-only" />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.allowReviews ? 'translate-x-6' : 'translate-x-1'}`} />
                 </div>
               </label>

               <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                 <div>
                    <span className="font-bold text-gray-900 dark:text-white block">Order Confirmation Emails</span>
                    <span className="text-sm text-gray-500">Send an email when a new order is placed</span>
                 </div>
                 <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.orderEmails ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <input type="checkbox" name="orderEmails" checked={settings.orderEmails} onChange={handleChange} className="sr-only" />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.orderEmails ? 'translate-x-6' : 'translate-x-1'}`} />
                 </div>
               </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-10 py-4 w-full sm:w-auto bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                <FiSave /> {loading ? 'Saving...' : 'Save Settings'}
              </button>
          </div>
        </form>

      </div>
    </div>
  );
}
