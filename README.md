# 🛒 EcoShop - Full-Stack MERN E-commerce Platform

A fully functional, production-ready e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include user authentication, shopping cart, checkout process, payment integration, admin dashboard, and much more.

## ✨ Features

### Frontend (Next.js + React)
- 🎨 **Modern UI** - Beautiful, responsive design with light/dark mode
- 🔍 **Product Search** - Advanced search with autocomplete
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🛍️ **Shopping Cart** - Add/remove items, update quantities
- 💳 **Checkout Process** - Multi-step checkout with order summary
- ⭐ **Product Reviews** - Rate and review products
- 👤 **User Dashboard** - Profile management, order history
- 🎯 **Category Filtering** - Browse by categories
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📧 **Newsletter** - Email subscription
- 🎭 **Smooth Animations** - Beautiful transitions and effects

### Backend (Node.js + Express)
- 🔐 **JWT Authentication** - Secure user authentication
- 🔒 **Password Hashing** - Bcrypt for secure passwords
- 🛡️ **Role-based Access** - User and Admin roles
- 📦 **RESTful API** - Clean API architecture
- 💾 **MongoDB Integration** - Scalable database
- 📧 **Email Notifications** - Order confirmations
- 🔄 **Stock Management** - Real-time inventory tracking
- ✅ **Input Validation** - Data validation and sanitization

### Admin Panel
- 📊 **Dashboard** - Sales analytics and insights
- 📦 **Product Management** - CRUD operations for products
- 👥 **User Management** - Manage customer accounts
- 📋 **Order Management** - Track and update orders
- 📂 **Category Management** - Organize product categories
- 📈 **Analytics** - Sales reports and top products

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd ecommerce-platform
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment variables**

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

5. **Setup MongoDB**

Make sure MongoDB is running locally or update `MONGO_URI` with your MongoDB Atlas connection string.

6. **Seed the database** (Optional - adds sample data)
```bash
cd server
npm run data:import
```

To destroy sample data:
```bash
npm run data:destroy
```

7. **Run the application**

Start the backend server:
```bash
cd server
npm run server
```

Start the frontend:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
ecommerce-platform/
├── client/                 # Frontend (Next.js)
│   ├── public/            # Static files
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   ├── redux/         # Redux store and slices
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── next.config.js
│
├── server/                # Backend (Node.js + Express)
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── data/             # Sample data
│   ├── server.js         # Server entry point
│   ├── seeder.js         # Database seeder
│   └── package.json
│
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Create review

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)

### Users (Admin)
- `GET /api/users` - Get all users
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

## 🔑 Default Login Credentials

After seeding the database, you can use these credentials:

**Admin Account:**
- Email: admin@example.com
- Password: password123

**User Accounts:**
- Email: john@example.com
- Password: password123

- Email: jane@example.com
- Password: password123

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **CSS Modules** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **Multer** - File upload

## 📝 Available Scripts

### Server Scripts
```bash
npm start          # Start server
npm run server     # Start server with nodemon
npm run data:import   # Import sample data
npm run data:destroy  # Destroy all data
```

### Client Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 🎨 Features in Detail

### User Features
1. **Browse Products** - View all products with pagination
2. **Search & Filter** - Find products by name, category, price
3. **Product Details** - View detailed product information
4. **Shopping Cart** - Add, remove, update quantities
5. **Checkout** - Complete purchase with shipping info
6. **Order History** - View past orders
7. **Product Reviews** - Rate and review products
8. **Profile Management** - Update account details

### Admin Features
1. **Dashboard** - Overview of sales and statistics
2. **Product Management** - Create, edit, delete products
3. **Order Management** - View and update order status
4. **User Management** - View and manage users
5. **Category Management** - Organize products
6. **Analytics** - Sales reports and insights

## 🔒 Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration

## 🚧 Future Enhancements
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Wishlist feature
- [ ] Coupon/discount codes
- [ ] Product variants (size, color)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Social media login
- [ ] Real-time notifications

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

## 👨‍💻 Author
Built with ❤️ for learning and demonstration purposes.

## 🐛 Known Issues
- Payment integration is currently mock/demo (not connected to real payment processor)
- Email notifications require SMTP configuration

## 📞 Support
For support, please open an issue in the GitHub repository.

---

**Happy Shopping! 🛍️**
