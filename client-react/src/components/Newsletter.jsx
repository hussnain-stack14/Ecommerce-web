import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
        <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <FiMail size={32} />
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
          Get the latest deals, new products, and exclusive offers delivered directly to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-4 rounded-xl text-gray-900 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300/50 transition-all font-medium placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-gray-800 shadow-xl hover:-translate-y-1 transition-all"
          >
            <FiSend /> Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm text-indigo-200">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
