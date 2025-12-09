'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import styles from './cart.module.css';

export default function CartPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        toast.info('Removed from cart');
    };

    const checkoutHandler = () => {
        if (userInfo) {
            router.push('/checkout');
        } else {
            router.push('/login?redirect=/checkout');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.15;
    const total = subtotal + shipping + tax;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>
                        <FiShoppingBag />
                    </div>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started</p>
                    <Link href="/products" className={styles.shopButton}>
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className={styles.content}>
                    <div className={styles.items}>
                        {cartItems.map((item) => (
                            <div key={item._id} className={styles.cartItem}>
                                <img src={item.image} alt={item.name} className={styles.itemImage} />

                                <div className={styles.itemDetails}>
                                    <Link href={`/products/${item._id}`} className={styles.itemName}>
                                        {item.name}
                                    </Link>
                                    <div className={styles.itemCategory}>{item.category}</div>
                                    <div className={styles.itemPrice}>${item.price}</div>
                                </div>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                                            className={styles.quantityButton}
                                            disabled={item.qty === 1}
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className={styles.quantity}>{item.qty}</span>
                                        <button
                                            onClick={() => addToCartHandler(item, item.qty + 1)}
                                            className={styles.quantityButton}
                                            disabled={item.qty >= item.countInStock}
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCartHandler(item._id)}
                                        className={styles.removeButton}
                                        aria-label="Remove item"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Tax (15%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryDivider}></div>

                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {shipping === 10 && (
                            <div className={styles.shippingNotice}>
                                Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                            </div>
                        )}

                        <button onClick={checkoutHandler} className={styles.checkoutButton}>
                            Proceed to Checkout
                        </button>

                        <Link href="/products" className={styles.continueButton}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
