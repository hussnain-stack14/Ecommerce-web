'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import {
    useGetProductDetailsQuery,
    useUpdateProductMutation
} from '../../../../redux/slices/productsApiSlice';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import styles from './edit.module.css';

export default function ProductEditPage() {
    const { id } = useParams();
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/login');
        }
    }, [userInfo, router]);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand || '');
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    if (!userInfo || !userInfo.isAdmin) {
        return null;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            }).unwrap();
            toast.success('Product updated successfully');
            router.push('/admin/products');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update product');
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/admin/products" className={styles.backLink}>
                <FiArrowLeft /> Back to Products
            </Link>

            <div className={styles.content}>
                <h1 className={styles.title}>Edit Product</h1>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div className={styles.error}>{error?.data?.message || 'Product not found'}</div>
                ) : (
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="price">Price ($)</label>
                                <input
                                    type="number"
                                    id="price"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    required
                                    step="0.01"
                                    min="0"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    id="brand"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Home & Garden">Home & Garden</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input
                                    type="number"
                                    id="countInStock"
                                    placeholder="0"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(Number(e.target.value))}
                                    required
                                    min="0"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="image">Image URL</label>
                                <input
                                    type="text"
                                    id="image"
                                    placeholder="Enter image URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="5"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loadingUpdate}
                            >
                                <FiSave /> {loadingUpdate ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
