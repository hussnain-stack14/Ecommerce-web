import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import ProductCard from '../components/ProductCard.jsx';
import Hero from '../components/Hero.jsx';
import FeaturedCategories from '../components/FeaturedCategories.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Newsletter from '../components/Newsletter.jsx';
import Loader from '../components/Loader.jsx';
import styles from './HomePage.module.css';

export default function HomePage() {
    const { data, isLoading, error } = useGetProductsQuery({});

    return (
        <>
            <Hero />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Featured Products</h2>
                        <p className={styles.sectionSubtitle}>
                            Discover our handpicked selection of premium products
                        </p>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <div className={styles.error}>
                            {error?.data?.message || 'Failed to load products'}
                        </div>
                    ) : (
                        <div className={styles.productGrid}>
                            {data?.products?.slice(0, 8).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <FeaturedCategories />

            <section className={styles.statsSection}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <h3 className={styles.statNumber}>10K+</h3>
                            <p className={styles.statLabel}>Happy Customers</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3 className={styles.statNumber}>5K+</h3>
                            <p className={styles.statLabel}>Products</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3 className={styles.statNumber}>50+</h3>
                            <p className={styles.statLabel}>Categories</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3 className={styles.statNumber}>99%</h3>
                            <p className={styles.statLabel}>Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
            <Newsletter />
        </>
    );
}
