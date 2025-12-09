'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import { FiFilter, FiX } from 'react-icons/fi';
import styles from './products.module.css';

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || '';

    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('latest');

    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageSize: 'all' });

    const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Accessories'];

    const filterProducts = (products) => {
        if (!products) return [];

        let filtered = [...products];

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Price range filter
        if (priceRange === 'under50') {
            filtered = filtered.filter(p => p.price < 50);
        } else if (priceRange === '50to100') {
            filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
        } else if (priceRange === 'over100') {
            filtered = filtered.filter(p => p.price > 100);
        }

        // Sort
        if (sortBy === 'priceLow') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHigh') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    };

    const filteredProducts = filterProducts(data?.products);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {keyword
                        ? `Search Results for "${keyword}"`
                        : selectedCategory
                            ? `${selectedCategory} Products`
                            : 'All Products'
                    }
                </h1>
                <button
                    className={styles.filterToggle}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FiFilter /> Filters
                </button>
            </div>

            <div className={styles.content}>
                <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>Filters</h3>
                        <button
                            className={styles.closeSidebar}
                            onClick={() => setShowFilters(false)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.filterSection}>
                        <h4 className={styles.filterTitle}>Category</h4>
                        <div className={styles.filterOptions}>
                            <label className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === ''}
                                    onChange={() => setSelectedCategory('')}
                                />
                                <span>All Categories</span>
                            </label>
                            {categories.map(cat => (
                                <label key={cat} className={styles.filterOption}>
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === cat}
                                        onChange={() => setSelectedCategory(cat)}
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h4 className={styles.filterTitle}>Price Range</h4>
                        <div className={styles.filterOptions}>
                            <label className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange === 'all'}
                                    onChange={() => setPriceRange('all')}
                                />
                                <span>All Prices</span>
                            </label>
                            <label className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange === 'under50'}
                                    onChange={() => setPriceRange('under50')}
                                />
                                <span>Under $50</span>
                            </label>
                            <label className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange === '50to100'}
                                    onChange={() => setPriceRange('50to100')}
                                />
                                <span>$50 - $100</span>
                            </label>
                            <label className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange === 'over100'}
                                    onChange={() => setPriceRange('over100')}
                                />
                                <span>Over $100</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h4 className={styles.filterTitle}>Sort By</h4>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.select}
                        >
                            <option value="latest">Latest</option>
                            <option value="priceLow">Price: Low to High</option>
                            <option value="priceHigh">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </aside>

                <main className={styles.main}>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <div className={styles.error}>
                            {error?.data?.message || 'Failed to load products'}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.empty}>
                            <h2>No products found</h2>
                            <p>Try adjusting your filters or search term</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.resultsInfo}>
                                Showing {filteredProducts.length} products
                            </div>
                            <div className={styles.productGrid}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
