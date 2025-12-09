'use client';

import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './Newsletter.module.css';

export default function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            toast.success('Thanks for subscribing!');
            setEmail('');
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.icon}>
                        <FiMail />
                    </div>
                    <h2 className={styles.title}>Subscribe to Our Newsletter</h2>
                    <p className={styles.subtitle}>
                        Get the latest deals, new products, and exclusive offers delivered to your inbox
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.button}>
                            <FiSend /> Subscribe
                        </button>
                    </form>

                    <p className={styles.privacy}>
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}
