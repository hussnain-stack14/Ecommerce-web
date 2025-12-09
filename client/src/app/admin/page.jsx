'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { FiPackage, FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiSettings } from 'react-icons/fi';
import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import { useGetUsersQuery } from '../../redux/slices/usersApiSlice';
import Loader from '../../components/Loader';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    // Fetch real data
    const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery();
    const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({ pageSize: 'all' });
    const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

    useEffect(() => {
        setMounted(true);
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/login');
        }
    }, [userInfo, router]);

    if (!mounted || !userInfo || !userInfo.isAdmin) {
        return null;
    }

    // Calculate real stats
    const totalRevenue = ordersData?.reduce((acc, order) => acc + (order.totalPrice || 0), 0) || 0;
    const totalOrders = ordersData?.length || 0;
    const totalProducts = productsData?.products?.length || 0;
    const totalUsers = usersData?.length || 0;

    const stats = [
        {
            title: 'Total Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: <FiDollarSign />,
            color: '#667eea',
            change: totalOrders > 0 ? `${totalOrders} orders` : 'No orders yet',
        },
        {
            title: 'Total Orders',
            value: totalOrders.toLocaleString(),
            icon: <FiShoppingBag />,
            color: '#f093fb',
            change: ordersData?.filter(o => o.isPaid).length || 0 + ' paid',
        },
        {
            title: 'Total Products',
            value: totalProducts.toLocaleString(),
            icon: <FiPackage />,
            color: '#4facfe',
            change: productsData?.products?.filter(p => p.countInStock > 0).length || 0 + ' in stock',
        },
        {
            title: 'Total Users',
            value: totalUsers.toLocaleString(),
            icon: <FiUsers />,
            color: '#43e97b',
            change: usersData?.filter(u => u.isAdmin).length || 0 + ' admins',
        },
    ];

    const quickLinks = [
        { name: 'Manage Products', href: '/admin/products', icon: <FiPackage /> },
        { name: 'Manage Orders', href: '/admin/orders', icon: <FiShoppingBag /> },
        { name: 'Manage Users', href: '/admin/users', icon: <FiUsers /> },
        { name: 'Settings', href: '/admin/settings', icon: <FiSettings /> },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p className={styles.subtitle}>Welcome back, {userInfo.name}!</p>
            </div>

            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard} style={{ '--stat-color': stat.color }}>
                        <div className={styles.statIcon} style={{ background: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statTitle}>{stat.title}</p>
                            <h3 className={styles.statValue}>{stat.value}</h3>
                            <span className={styles.statChange}>{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.quickLinks}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.linksGrid}>
                    {quickLinks.map((link, index) => (
                        <Link key={index} href={link.href} className={styles.linkCard}>
                            <div className={styles.linkIcon}>{link.icon}</div>
                            <span className={styles.linkName}>{link.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className={styles.recentActivity}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                        <FiShoppingBag className={styles.activityIcon} />
                        <div>
                            <p className={styles.activityTitle}>New order #1234 received</p>
                            <p className={styles.activityTime}>5 minutes ago</p>
                        </div>
                    </div>
                    <div className={styles.activityItem}>
                        <FiUsers className={styles.activityIcon} />
                        <div>
                            <p className={styles.activityTitle}>New user registered</p>
                            <p className={styles.activityTime}>1 hour ago</p>
                        </div>
                    </div>
                    <div className={styles.activityItem}>
                        <FiPackage className={styles.activityIcon} />
                        <div>
                            <p className={styles.activityTitle}>Product stock updated</p>
                            <p className={styles.activityTime}>2 hours ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
