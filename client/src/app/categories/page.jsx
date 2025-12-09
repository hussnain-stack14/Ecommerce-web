'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiMonitor, FiShoppingBag, FiHome, FiWatch } from 'react-icons/fi';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import styles from './categories.module.css';

export default function CategoriesPage() {
    const { data, isLoading } = useGetProductsQuery({ pageSize: 'all' });
    const [categoryCounts, setCategoryCounts] = useState({
        'Electronics': 0,
        'Fashion': 0,
        'Home & Garden': 0,
        'Accessories': 0
    });

    useEffect(() => {
        if (data?.products) {
            const counts = {
                'Electronics': 0,
                'Fashion': 0,
                'Home & Garden': 0,
                'Accessories': 0
            };

            data.products.forEach(product => {
                if (counts.hasOwnProperty(product.category)) {
                    counts[product.category]++;
                }
            });

            setCategoryCounts(counts);
        }
    }, [data]);

    const categories = [
        {
            name: 'Electronics',
            icon: <FiMonitor />,
            count: categoryCounts['Electronics'],
            color: '#667eea',
            slug: 'Electronics',
            description: 'Latest gadgets, computers, and tech accessories',
        },
        {
            name: 'Fashion',
            icon: <FiShoppingBag />,
            count: categoryCounts['Fashion'],
            color: '#f093fb',
            slug: 'Fashion',
            description: 'Clothing, shoes, and apparel for all styles',
        },
        {
            name: 'Home & Garden',
            icon: <FiHome />,
            count: categoryCounts['Home & Garden'],
            color: '#4facfe',
            slug: 'Home & Garden',
            description: 'Kitchen appliances, furniture, and outdoor items',
        },
        {
            name: 'Accessories',
            icon: <FiWatch />,
            count: categoryCounts['Accessories'],
            color: '#43e97b',
            slug: 'Accessories',
            description: 'Watches, bags, wallets, and personal items',
        },
    ];

    const totalProducts = data?.products?.length || 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Shop by Category</h1>
                <p className={styles.subtitle}>
                    Discover our {totalProducts} products across 4 categories
                </p>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #667eea',
                        borderRadius: '50%',
                        margin: '0 auto',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ marginTop: '20px', color: '#666' }}>Loading categories...</p>
                </div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={`/products?category=${encodeURIComponent(category.slug)}`}
                                className={styles.card}
                                style={{ '--category-color': category.color }}
                            >
                                <div className={styles.iconWrapper} style={{ color: category.color }}>
                                    {category.icon}
                                </div>
                                <h3 className={styles.name}>{category.name}</h3>
                                <p className={styles.description}>{category.description}</p>
                                <p className={styles.count}>{category.count} products</p>
                                <div className={styles.arrow}>→</div>
                            </Link>
                        ))}
                    </div>

                    {/* Benefits Banner */}
                    <div className={styles.banner}>
                        <h2>Why Shop By Category?</h2>
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <div className={styles.benefitIcon}>🎯</div>
                                <h4>Find What You Need</h4>
                                <p>Quickly browse products that match your interests</p>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.benefitIcon}>⚡</div>
                                <h4>Save Time</h4>
                                <p>No need to scroll through everything</p>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.benefitIcon}>✨</div>
                                <h4>Discover More</h4>
                                <p>Explore products you might have missed</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
