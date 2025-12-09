'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery, useDeliverOrderMutation } from '../../../redux/slices/ordersApiSlice';
import Link from 'next/link';
import { FiCheck, FiX, FiPackage, FiEye } from 'react-icons/fi';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';
import styles from './orders.module.css';

export default function AdminOrdersPage() {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/login');
        }
    }, [userInfo, router]);

    if (!userInfo || !userInfo.isAdmin) {
        return null;
    }

    const deliverHandler = async (orderId) => {
        try {
            await deliverOrder(orderId).unwrap();
            refetch();
            toast.success('Order marked as delivered');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update order');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Manage Orders</h1>
                    <p className={styles.subtitle}>Track and manage all customer orders</p>
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className={styles.error}>{error?.data?.message || 'Failed to load orders'}</div>
            ) : (
                <>
                    <div className={styles.statsBar}>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Total Orders:</span>
                            <span className={styles.statValue}>{orders?.length || 0}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Paid:</span>
                            <span className={styles.statValue}>
                                {orders?.filter(o => o.isPaid).length || 0}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Delivered:</span>
                            <span className={styles.statValue}>
                                {orders?.filter(o => o.isDelivered).length || 0}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Pending:</span>
                            <span className={styles.statValue}>
                                {orders?.filter(o => !o.isDelivered).length || 0}
                            </span>
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr key={order._id}>
                                        <td className={styles.orderId}>#{order._id.substring(0, 8)}</td>
                                        <td className={styles.userName}>{order.user?.name || 'N/A'}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className={styles.price}>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {order.isPaid ? (
                                                <span className={styles.statusPaid}>
                                                    <FiCheck /> Paid
                                                    <span className={styles.statusDate}>
                                                        {new Date(order.paidAt).toLocaleDateString()}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className={styles.statusUnpaid}>
                                                    <FiX /> Not Paid
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                <span className={styles.statusDelivered}>
                                                    <FiCheck /> Delivered
                                                    <span className={styles.statusDate}>
                                                        {new Date(order.deliveredAt).toLocaleDateString()}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className={styles.statusPending}>
                                                    <FiX /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <Link
                                                    href={`/orders/${order._id}`}
                                                    className={styles.viewButton}
                                                >
                                                    <FiEye /> View
                                                </Link>
                                                {!order.isDelivered && (
                                                    <button
                                                        onClick={() => deliverHandler(order._id)}
                                                        className={styles.deliverButton}
                                                        disabled={loadingDeliver}
                                                    >
                                                        <FiPackage /> Mark as Delivered
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
