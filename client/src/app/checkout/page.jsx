'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FiCreditCard, FiTruck, FiCheckCircle } from 'react-icons/fi';
import { saveShippingAddress, savePaymentMethod } from '../../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../../redux/slices/ordersApiSlice';
import { clearCartItems } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);

    const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [payment, setPayment] = useState(paymentMethod || 'PayPal');

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/checkout');
        }
        if (cartItems.length === 0) {
            router.push('/cart');
        }
    }, [userInfo, cartItems, router]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.15;
    const total = subtotal + shipping + tax;

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(payment));
        setStep(3);
    };

    const handlePlaceOrder = async () => {
        try {
            const res = await createOrder({
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                })),
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: payment,
                itemsPrice: subtotal,
                shippingPrice: shipping,
                taxPrice: tax,
                totalPrice: total,
            }).unwrap();

            dispatch(clearCartItems());
            router.push(`/orders/${res._id}`);
            toast.success('Order placed successfully!');
        } catch (err) {
            toast.error(err?.data?.message || err?.error || 'Failed to place order');
        }
    };

    if (!userInfo || cartItems.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                <div className={`${styles.stepItem} ${step >= 1 ? styles.active : ''}`}>
                    <div className={styles.stepNumber}>1</div>
                    <span>Shipping</span>
                </div>
                <div className={styles.stepLine}></div>
                <div className={`${styles.stepItem} ${step >= 2 ? styles.active : ''}`}>
                    <div className={styles.stepNumber}>2</div>
                    <span>Payment</span>
                </div>
                <div className={styles.stepLine}></div>
                <div className={`${styles.stepItem} ${step >= 3 ? styles.active : ''}`}>
                    <div className={styles.stepNumber}>3</div>
                    <span>Review</span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.main}>
                    {step === 1 && (
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <FiTruck /> Shipping Address
                            </h2>
                            <form onSubmit={handleShippingSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Street Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Postal Code</label>
                                        <input
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            required
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        placeholder="United States"
                                    />
                                </div>
                                <button type="submit" className={styles.button}>
                                    Continue to Payment
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <FiCreditCard /> Payment Method
                            </h2>
                            <form onSubmit={handlePaymentSubmit} className={styles.form}>
                                <div className={styles.paymentOptions}>
                                    <label className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            value="PayPal"
                                            checked={payment === 'PayPal'}
                                            onChange={(e) => setPayment(e.target.value)}
                                        />
                                        <span>PayPal</span>
                                    </label>
                                    <label className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            value="Stripe"
                                            checked={payment === 'Stripe'}
                                            onChange={(e) => setPayment(e.target.value)}
                                        />
                                        <span>Credit Card</span>
                                    </label>
                                    <label className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            value="Cash"
                                            checked={payment === 'Cash'}
                                            onChange={(e) => setPayment(e.target.value)}
                                        />
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                                <div className={styles.formButtons}>
                                    <button type="button" onClick={() => setStep(1)} className={styles.buttonSecondary}>
                                        Back
                                    </button>
                                    <button type="submit" className={styles.button}>
                                        Continue to Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <FiCheckCircle /> Review Order
                            </h2>
                            <div className={styles.review}>
                                <div className={styles.reviewSection}>
                                    <h3>Shipping Address</h3>
                                    <p>{address}</p>
                                    <p>{city}, {postalCode}</p>
                                    <p>{country}</p>
                                </div>
                                <div className={styles.reviewSection}>
                                    <h3>Payment Method</h3>
                                    <p>{payment}</p>
                                </div>
                                <div className={styles.reviewSection}>
                                    <h3>Order Items</h3>
                                    {cartItems.map((item) => (
                                        <div key={item._id} className={styles.reviewItem}>
                                            <img src={item.image} alt={item.name} />
                                            <div>
                                                <p>{item.name}</p>
                                                <p>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.formButtons}>
                                    <button type="button" onClick={() => setStep(2)} className={styles.buttonSecondary}>
                                        Back
                                    </button>
                                    <button onClick={handlePlaceOrder} disabled={isLoading} className={styles.button}>
                                        {isLoading ? 'Processing...' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.summary}>
                    <h3>Order Summary</h3>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryDivider}></div>
                    <div className={styles.summaryTotal}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
