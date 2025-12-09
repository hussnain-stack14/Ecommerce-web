'use client';

import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>
                            <span className={styles.logoText}>Eco</span>
                            <span className={styles.logoAccent}>Shop</span>
                        </h3>
                        <p className={styles.description}>
                            Your one-stop destination for premium products at unbeatable prices.
                            Quality guaranteed, delivered with care.
                        </p>
                        <div className={styles.social}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">
                                <FiFacebook />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                <FiTwitter />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <FiInstagram />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                <FiLinkedin />
                            </a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Quick Links</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/products">All Products</Link></li>
                            <li><Link href="/categories">Categories</Link></li>
                            <li><Link href="/deals">Special Deals</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Customer Service</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/shipping">Shipping Info</Link></li>
                            <li><Link href="/returns">Returns Policy</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contact Us</h4>
                        <ul className={styles.contactList}>
                            <li>
                                <FiMapPin />
                                <span>123 Shopping Street, NY 10001</span>
                            </li>
                            <li>
                                <FiPhone />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li>
                                <FiMail />
                                <span>support@ecoshop.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} EcoShop. All rights reserved.
                    </p>
                    <div className={styles.legal}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/terms">Terms of Service</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
