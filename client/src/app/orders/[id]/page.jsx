'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery } from '../../../redux/slices/ordersApiSlice';
import Loader from '../../../components/Loader';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';
import styles from './order.module.css';

export default function OrderDetailPage({ params }) {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const { id } = use(params);

    const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
    }, [userInfo, router]);

    if (!userInfo) {
        return null;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    {error?.data?.message || 'Order not found'}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Order #{order._id.substring(0, 8)}</h1>
                    <p className={styles.subtitle}>
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                <div className={styles.statusBadges}>
                    {order.isPaid ? (
                        <div className={styles.paidBadge}>
                            <FiCheckCircle /> Paid
                        </div>
                    ) : (
                        <div className={styles.unpaidBadge}>
                            <FiClock /> Not Paid
                        </div>
                    )}
                    {order.isDelivered ? (
                        <div className={styles.deliveredBadge}>
                            <FiCheckCircle /> Delivered
                        </div>
                    ) : (
                        <div className={styles.pendingBadge}>
                            <FiTruck /> Pending
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.main}>
                    {/* Shipping Information */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>
                            <FiTruck /> Shipping Information
                        </h2>
                        <div className={styles.cardContent}>
                            <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                            <p><strong>City:</strong> {order.shippingAddress.city}</p>
                            <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                            <p><strong>Country:</strong> {order.shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>
                            <FiCheckCircle /> Payment Information
                        </h2>
                        <div className={styles.cardContent}>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <p className={styles.successText}>
                                    <FiCheckCircle /> Paid on {new Date(order.paidAt).toLocaleDateString()}
                                </p>
                            ) : (
                                <p className={styles.warningText}>
                                    <FiClock /> Not paid yet
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>
                            <FiPackage /> Order Items
                        </h2>
                        <div className={styles.itemsList}>
                            {order.orderItems.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <p className={styles.itemName}>{item.name}</p>
                                        <p className={styles.itemPrice}>
                                            {item.qty} × ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className={styles.summary}>
                    <h3 className={styles.summaryTitle}>Order Summary</h3>
                    <div className={styles.summaryContent}>
                        <div className={styles.summaryRow}>
                            <span>Items</span>
                            <span>${order.itemsPrice?.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>${order.shippingPrice?.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Tax</span>
                            <span>${order.taxPrice?.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryDivider}></div>
                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>${order.totalPrice?.toFixed(2)}</span>
                        </div>
                    </div>

                    {!order.isPaid && (
                        <div className={styles.paymentInfo}>
                            <p className={styles.paymentMessage}>Payment is required to complete your order.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
