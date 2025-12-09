'use client';

import Link from 'next/link';
import { FiTag, FiTrendingUp, FiZap } from 'react-icons/fi';
import styles from './deals.module.css';

export default function DealsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Special Deals</h1>
                <p className={styles.subtitle}>
                    Amazing discounts and limited-time offers
                </p>
            </div>

            <div className={styles.comingSoon}>
                <div className={styles.icon}>
                    <FiTag />
                </div>
                <h2>Coming Soon!</h2>
                <p>We're working on bringing you the best deals. Check back soon!</p>
                <Link href="/products" className={styles.button}>
                    Browse All Products
                </Link>
            </div>
        </div>
    );
}
