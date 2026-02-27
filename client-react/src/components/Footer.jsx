import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold mb-4">
              <span className="gradient-text">Eco</span>
              <span className="text-white">Shop</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your one-stop destination for premium products at unbeatable prices. Quality guaranteed, delivered with care.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-indigo-500 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label="Social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/products', label: 'All Products' },
                { to: '/categories', label: 'Categories' },
                { to: '/deals', label: 'Special Deals' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping Info', 'Returns Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              {[
                { icon: FiMapPin, text: '123 Shopping Street, NY 10001' },
                { icon: FiPhone, text: '+1 (555) 123-4567' },
                { icon: FiMail, text: 'support@ecoshop.com' },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <Icon size={16} className="text-indigo-400 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {currentYear} EcoShop. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
