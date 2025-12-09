'use client';

import Link from 'next/link';
import { FiShoppingBag, FiTrendingUp, FiAward } from 'react-icons/fi';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Discover Premium Products at
                        <span className={styles.highlight}> Unbeatable Prices</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Shop the latest trends in electronics, fashion, and home goods.
                        Quality guaranteed with fast, free shipping on all orders over $100.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/products" className={styles.primaryButton}>
                            <FiShoppingBag /> Shop Now
                        </Link>
                        <Link href="/deals" className={styles.secondaryButton}>
                            View Deals
                        </Link>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <FiShoppingBag className={styles.featureIcon} />
                            <div>
                                <h3>10,000+ Products</h3>
                                <p>Wide selection</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiTrendingUp className={styles.featureIcon} />
                            <div>
                                <h3>Best Prices</h3>
                                <p>Guaranteed savings</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiAward className={styles.featureIcon} />
                            <div>
                                <h3>Top Quality</h3>
                                <p>Premium products</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <div className={styles.glowEffect}></div>
                    <div className={styles.heroImage}>
                        <div className={styles.floatingCard} style={{ top: '10%', left: '5%' }}>
                            <span className={styles.cardIcon}>🎧</span>
                            <div>
                                <p className={styles.cardTitle}>Headphones</p>
                                <p className={styles.cardPrice}>$89.99</p>
                            </div>
                        </div>
                        <div className={styles.floatingCard} style={{ top: '50%', right: '5%' }}>
                            <span className={styles.cardIcon}>📱</span>
                            <div>
                                <p className={styles.cardTitle}>Smartphones</p>
                                <p className={styles.cardPrice}>$599.99</p>
                            </div>
                        </div>
                        <div className={styles.floatingCard} style={{ bottom: '15%', left: '10%' }}>
                            <span className={styles.cardIcon}>⌚</span>
                            <div>
                                <p className={styles.cardTitle}>Smartwatch</p>
                                <p className={styles.cardPrice}>$199.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
