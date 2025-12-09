'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
    useGetProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation
} from '../../../redux/slices/productsApiSlice';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';
import styles from './products.module.css';

export default function AdminProductsPage() {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageSize: 'all' });
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/login');
        }
    }, [userInfo, router]);

    if (!userInfo || !userInfo.isAdmin) {
        return null;
    }

    const deleteHandler = async (id) => {
        try {
            await deleteProduct(id).unwrap();
            refetch();
            toast.success('Product deleted successfully');
            setDeleteConfirmId(null);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete product');
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Create a new sample product?')) {
            try {
                const newProduct = await createProduct().unwrap();

                // Wait a tiny bit for the cache to invalidate and refetch
                await new Promise(resolve => setTimeout(resolve, 100));

                toast.success('Product created successfully!');

                // Ask if they want to edit the new product
                if (window.confirm('Product created! Do you want to edit it now?')) {
                    router.push(`/admin/products/${newProduct._id}`);
                }
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to create product');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Manage Products</h1>
                    <p className={styles.subtitle}>Manage your product inventory</p>
                </div>
                <button onClick={createProductHandler} className={styles.createButton} disabled={loadingCreate}>
                    <FiPlus /> {loadingCreate ? 'Creating...' : 'Create Product'}
                </button>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className={styles.error}>{error?.data?.message || 'Failed to load products'}</div>
            ) : (
                <>
                    <div className={styles.statsBar}>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Total Products:</span>
                            <span className={styles.statValue}>{data?.products?.length || 0}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>In Stock:</span>
                            <span className={styles.statValue}>
                                {data?.products?.filter(p => p.countInStock > 0).length || 0}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Out of Stock:</span>
                            <span className={styles.statValue}>
                                {data?.products?.filter(p => p.countInStock === 0).length || 0}
                            </span>
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.products?.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img src={product.image} alt={product.name} className={styles.productImage} />
                                        </td>
                                        <td className={styles.productName}>{product.name}</td>
                                        <td className={styles.price}>${product.price.toFixed(2)}</td>
                                        <td>
                                            <span className={styles.category}>{product.category}</span>
                                        </td>
                                        <td>
                                            <span className={product.countInStock > 0 ? styles.inStock : styles.outOfStock}>
                                                {product.countInStock} units
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.rating}>
                                                ⭐ {product.rating.toFixed(1)} ({product.numReviews})
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <Link
                                                    href={`/admin/products/${product._id}`}
                                                    className={styles.editButton}
                                                >
                                                    <FiEdit /> Edit
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteConfirmId(product._id)}
                                                    className={styles.deleteButton}
                                                    disabled={loadingDelete}
                                                >
                                                    <FiTrash2 /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className={styles.modal} onClick={() => setDeleteConfirmId(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Confirm Delete</h3>
                            <button onClick={() => setDeleteConfirmId(null)} className={styles.closeButton}>
                                <FiX />
                            </button>
                        </div>
                        <p className={styles.modalText}>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteHandler(deleteConfirmId)}
                                className={styles.confirmDeleteButton}
                                disabled={loadingDelete}
                            >
                                {loadingDelete ? 'Deleting...' : 'Delete Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
