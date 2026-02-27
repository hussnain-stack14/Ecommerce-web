import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Buyer',
      avatar: '👩',
      rating: 5,
      text: 'Amazing quality and fast shipping! The products exceeded my expectations. Will definitely shop here again.',
    },
    {
      name: 'Michael Chen',
      role: 'Regular Customer',
      avatar: '👨',
      rating: 5,
      text: 'Best online shopping experience ever. Great prices, excellent customer service, and high-quality products.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Happy Customer',
      avatar: '👩‍🦰',
      rating: 5,
      text: 'I love the variety of products available. The website is easy to navigate and checkout is super smooth!',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/50 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Join thousands of satisfied customers who love shopping with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex gap-1 mb-6 text-amber-400 fill-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-indigo-50 dark:bg-indigo-900/50 rounded-full shadow-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-indigo-500 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
