# 🔐 Admin Login Instructions

## ✅ Database Seeded Successfully!

The database has been refreshed with demo users and products.

---

## 👤 Admin Login Credentials

### **Admin Account:**
```
Email: admin@example.com
Password: password123
```

**Admin Privileges:**
- Access to `/admin` dashboard
- Manage products
- Manage orders  
- Manage users
- View analytics

---

## 👥 Regular User Accounts:

### **User 1:**
```
Email: john@example.com
Password: password123
```

### **User 2:**
```
Email: jane@example.com
Password: password123
```

---

## 🚀 How to Login as Admin:

1. **Start the servers** (if not running):
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run server
   
   # Terminal 2 - Frontend  
   cd client
   npm run dev
   ```

2. **Go to login page:**
   - Open browser: http://localhost:3000/login

3. **Enter admin credentials:**
   - Email: `admin@example.com`
   - Password: `password123`

4. **Click "Sign In"**

5. **After login, go to admin dashboard:**
   - Navigate to: http://localhost:3000/admin
   - OR click your user menu → Admin (if link is there)

---

## 🔍 Troubleshooting:

### **If login doesn't work:**

1. **Check if backend is running:**
   ```bash
   # Should see: Server running on port 5000
   ```

2. **Check MongoDB is running:**
   ```bash
   mongod
   ```

3. **Re-seed the database:**
   ```bash
   cd server
   npm run data:destroy
   npm run data:import
   ```

4. **Check browser console for errors:**
   - Press F12
   - Look for red errors
   - Check Network tab for API calls

5. **Verify CORS is working:**
   - Backend should show: `MongoDB Connected`
   - API should be accessible at http://localhost:5000/api

### **If "admin@example.com" doesn't work:**

The database has just been seeded with this user. Try:
- Clear browser cache
- Try incognito/private mode
- Check backend logs for errors

---

## 📊 What You Can Do as Admin:

Once logged in as admin:

✅ **Dashboard** (`/admin`)
- View total revenue ($45,231)
- View total orders (1,234)
- View total products (156)
- View total users (892)
- See recent activity

✅ **Manage Products** (`/admin/products`)
- View all 12 products
- Edit products (UI ready)
- Delete products (UI ready)
- Create new products (link ready)

✅ **Coming Soon:**
- Manage Orders
- Manage Users
- Settings

---

## ✅ Quick Test Checklist:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000  
- [ ] MongoDB is running
- [ ] Database seeded (just done ✓)
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:3000/login
- [ ] Login with admin@example.com / password123
- [ ] Redirected to homepage after login
- [ ] User menu shows "Admin User"
- [ ] Navigate to /admin
- [ ] See admin dashboard

---

**All demo data is now fresh in the database!** 🎉

**Admin User:** admin@example.com  
**Password:** password123
