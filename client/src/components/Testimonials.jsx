'use client';

import { FiStar } from 'react-icons/fi';
import styles from './Testimonials.module.css';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Verified Buyer',
            avatar: '👩',
            rating: 5,
            text: 'Amazing quality and fast shipping! The products exceeded my expectations. Will definitely shop here again.',
        },
        {
            name: 'Michael Chen',
            role: 'Regular Customer',
            avatar: '👨',
            rating: 5,
            text: 'Best online shopping experience ever. Great prices, excellent customer service, and high-quality products.',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Happy Customer',
            avatar: '👩‍🦰',
            rating: 5,
            text: 'I love the variety of products available. The website is easy to navigate and checkout is super smooth!',
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>What Our Customers Say</h2>
                    <p className={styles.subtitle}>Join thousands of satisfied customers</p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.stars}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className={styles.star} />
                                ))}
                            </div>

                            <p className={styles.text}>"{testimonial.text}"</p>

                            <div className={styles.author}>
                                <div className={styles.avatar}>{testimonial.avatar}</div>
                                <div>
                                    <div className={styles.name}>{testimonial.name}</div>
                                    <div className={styles.role}>{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
