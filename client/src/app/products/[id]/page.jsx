'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiMinus, FiPlus, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../../../redux/slices/productsApiSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';
import styles from './productDetail.module.css';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id);
    const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        toast.success('Added to cart!');
    };

    const submitReviewHandler = async (e) => {
        e.preventDefault();

        if (!userInfo) {
            toast.error('Please login to write a review');
            router.push('/login');
            return;
        }

        try {
            await createReview({ productId: id, rating, comment }).unwrap();
            refetch();
            toast.success('Review submitted successfully');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to submit review');
        }
    };

    const incrementQty = () => {
        if (qty < product.countInStock) {
            setQty(qty + 1);
        }
    };

    const decrementQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    if (isLoading) return <Loader />;

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h2>Product not found</h2>
                <p>{error?.data?.message || 'Failed to load product'}</p>
                <Link href="/products" className={styles.backLink}>
                    <FiChevronLeft /> Back to Products
                </Link>
            </div>
        );
    }

    // Mock multiple images - in a real app, this would come from the product data
    const productImages = [product.image, product.image, product.image];

    return (
        <div className={styles.container}>
            <Link href="/products" className={styles.backLink}>
                <FiChevronLeft /> Back to Products
            </Link>

            <div className={styles.productSection}>
                {/* Image Gallery */}
                <div className={styles.imageGallery}>
                    <div className={styles.mainImageContainer}>
                        <img
                            src={productImages[selectedImage]}
                            alt={product.name}
                            className={styles.mainImage}
                        />
                        {product.countInStock === 0 && (
                            <div className={styles.outOfStockBadge}>Out of Stock</div>
                        )}
                    </div>
                    <div className={styles.thumbnails}>
                        {productImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`${styles.thumbnail} ${selectedImage === idx ? styles.thumbnailActive : ''}`}
                            >
                                <img src={img} alt={`${product.name} ${idx + 1}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                    <div className={styles.category}>{product.category}</div>
                    <h1 className={styles.productName}>{product.name}</h1>

                    <div className={styles.ratingSection}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                                />
                            ))}
                        </div>
                        <span className={styles.ratingText}>
                            {product.rating.toFixed(1)} ({product.numReviews} reviews)
                        </span>
                    </div>

                    <div className={styles.price}>${product.price.toFixed(2)}</div>

                    <p className={styles.description}>{product.description}</p>

                    {/* Quantity Selector & Add to Cart */}
                    <div className={styles.purchaseSection}>
                        <div className={styles.quantitySelector}>
                            <label>Quantity:</label>
                            <div className={styles.quantityControls}>
                                <button
                                    onClick={decrementQty}
                                    disabled={qty === 1}
                                    className={styles.qtyButton}
                                    aria-label="Decrease quantity"
                                >
                                    <FiMinus />
                                </button>
                                <span className={styles.qtyValue}>{qty}</span>
                                <button
                                    onClick={incrementQty}
                                    disabled={qty >= product.countInStock}
                                    className={styles.qtyButton}
                                    aria-label="Increase quantity"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>

                        <div className={styles.stockInfo}>
                            {product.countInStock > 0 ? (
                                <span className={styles.inStock}>
                                    {product.countInStock} in stock
                                </span>
                            ) : (
                                <span className={styles.outOfStock}>Out of Stock</span>
                            )}
                        </div>

                        <div className={styles.actionButtons}>
                            <button
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                className={styles.addToCartBtn}
                            >
                                <FiShoppingCart /> Add to Cart
                            </button>
                            <button className={styles.wishlistBtn} aria-label="Add to wishlist">
                                <FiHeart />
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <FiTruck />
                            <div>
                                <h4>Free Shipping</h4>
                                <p>On orders over $50</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiShield />
                            <div>
                                <h4>Secure Payment</h4>
                                <p>100% secure transactions</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiRotateCcw />
                            <div>
                                <h4>Easy Returns</h4>
                                <p>30-day return policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className={styles.reviewsSection}>
                <h2 className={styles.sectionTitle}>Customer Reviews</h2>

                {/* Review Form */}
                {userInfo ? (
                    <div className={styles.reviewForm}>
                        <h3>Write a Review</h3>
                        <form onSubmit={submitReviewHandler}>
                            <div className={styles.formGroup}>
                                <label>Rating</label>
                                <div className={styles.ratingInput}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={styles.starButton}
                                        >
                                            <FiStar
                                                className={star <= rating ? styles.starFilled : styles.starEmpty}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="comment">Comment</label>
                                <textarea
                                    id="comment"
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    placeholder="Share your thoughts about this product..."
                                    className={styles.textarea}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loadingReview}
                                className={styles.submitButton}
                            >
                                {loadingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className={styles.loginPrompt}>
                        Please <Link href="/login">login</Link> to write a review
                    </div>
                )}

                {/* Review List */}
                <div className={styles.reviewList}>
                    {product.reviews && product.reviews.length === 0 && (
                        <p className={styles.noReviews}>No reviews yet</p>
                    )}

                    {product.reviews?.map((review) => (
                        <div key={review._id} className={styles.review}>
                            <div className={styles.reviewHeader}>
                                <div>
                                    <strong>{review.name}</strong>
                                    <div className={styles.reviewStars}>
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={i < review.rating ? styles.starFilled : styles.starEmpty}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className={styles.reviewDate}>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className={styles.reviewComment}>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
