'use client';

import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty: 1 }));
        toast.success('Added to cart!');
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link href={`/products/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                    />
                </Link>
                {product.countInStock === 0 && (
                    <div className={styles.outOfStock}>Out of Stock</div>
                )}
                <button className={styles.wishlistButton} aria-label="Add to wishlist">
                    <FiHeart />
                </button>
            </div>

            <div className={styles.content}>
                <Link href={`/products/${product._id}`} className={styles.name}>
                    {product.name}
                </Link>

                <div className={styles.category}>{product.category}</div>

                <div className={styles.rating}>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <FiStar
                                key={i}
                                className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                            />
                        ))}
                    </div>
                    <span className={styles.reviews}>({product.numReviews})</span>
                </div>

                <div className={styles.footer}>
                    <div className={styles.price}>${product.price}</div>
                    <button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className={styles.addToCartButton}
                        aria-label="Add to cart"
                    >
                        <FiShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    );
}
