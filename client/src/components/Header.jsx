'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import styles from './Header.module.css';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mounted, setMounted] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    // Fix hydration error
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            router.push('/');
            toast.success('Logged out successfully');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to logout');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/products?search=${searchTerm}`);
            setSearchTerm('');
        }
    };

    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>Eco</span>
                    <span className={styles.logoAccent}>Shop</span>
                </Link>

                <form onSubmit={handleSearch} className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <FiSearch />
                    </button>
                </form>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
                    <Link href="/products" className={styles.navLink}>
                        Products
                    </Link>
                    <Link href="/categories" className={styles.navLink}>
                        Categories
                    </Link>
                    <Link href="/deals" className={styles.navLink}>
                        Deals
                    </Link>
                </nav>

                <div className={styles.actions}>
                    <button onClick={toggleTheme} className={styles.iconButton} aria-label="Toggle theme">
                        {theme === 'light' ? <FiMoon /> : <FiSun />}
                    </button>

                    <Link href="/cart" className={styles.cartButton}>
                        <FiShoppingCart />
                        {mounted && cartItemsCount > 0 && (
                            <span className={styles.cartBadge} suppressHydrationWarning>
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>

                    {mounted && userInfo ? (
                        <div className={styles.userMenu}>
                            <button
                                className={styles.userButton}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <FiUser />
                                <span>{userInfo.name}</span>
                            </button>
                            {showUserMenu && (
                                <div className={styles.userDropdown}>
                                    <Link href="/profile" className={styles.dropdownItem}>
                                        <FiSettings /> Profile
                                    </Link>
                                    <Link href="/orders" className={styles.dropdownItem}>
                                        <FiPackage /> My Orders
                                    </Link>
                                    {userInfo.isAdmin && (
                                        <Link href="/admin" className={styles.dropdownItem}>
                                            <FiSettings /> Admin Dashboard
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className={styles.dropdownItem}>
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : mounted ? (
                        <Link href="/login" className={styles.loginButton}>
                            <FiUser /> Login
                        </Link>
                    ) : null}

                    <button
                        className={styles.menuToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </header>
    );
}
