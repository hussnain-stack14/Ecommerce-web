'use client';

import Link from 'next/link';
import { FiMonitor, FiShoppingBag, FiHome, FiWatch } from 'react-icons/fi';
import styles from './FeaturedCategories.module.css';

export default function FeaturedCategories() {
    const categories = [
        {
            name: 'Electronics',
            icon: <FiMonitor />,
            count: '1,234 products',
            color: '#667eea',
        },
        {
            name: 'Fashion',
            icon: <FiShoppingBag />,
            count: '856 products',
            color: '#f093fb',
        },
        {
            name: 'Home & Garden',
            icon: <FiHome />,
            count: '642 products',
            color: '#4facfe',
        },
        {
            name: 'Accessories',
            icon: <FiWatch />,
            count: '421 products',
            color: '#43e97b',
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Shop by Category</h2>
                    <p className={styles.subtitle}>Browse our wide selection of categories</p>
                </div>

                <div className={styles.grid}>
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/products?category=${category.name}`}
                            className={styles.card}
                        >
                            <div
                                className={styles.iconWrapper}
                                style={{ color: category.color }}
                            >
                                {category.icon}
                            </div>
                            <h3 className={styles.name}>{category.name}</h3>
                            <p className={styles.count}>{category.count}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
