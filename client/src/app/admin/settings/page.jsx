'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiSave, FiSettings, FiGlobe, FiLock } from 'react-icons/fi';
import styles from './settings.module.css';

export default function AdminSettingsPage() {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState({
        storeName: 'TechStore',
        supportEmail: 'support@techstore.com',
        currency: 'USD',
        taxRate: 10,
        maintenanceMode: false,
        allowReviews: true,
        orderEmails: true
    });

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/login');
        }
    }, [userInfo, router]);

    if (!userInfo || !userInfo.isAdmin) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        toast.success('Settings updated successfully');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Store Settings</h1>
                <p className={styles.subtitle}>Manage your store configuration and preferences</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FiSettings style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        General Information
                    </h2>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="storeName">Store Name</label>
                        <input
                            type="text"
                            id="storeName"
                            name="storeName"
                            value={settings.storeName}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="supportEmail">Support Email</label>
                        <input
                            type="email"
                            id="supportEmail"
                            name="supportEmail"
                            value={settings.supportEmail}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FiGlobe style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Localization & Tax
                    </h2>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="currency">Currency</label>
                        <select
                            id="currency"
                            name="currency"
                            value={settings.currency}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="taxRate">Tax Rate (%)</label>
                        <input
                            type="number"
                            id="taxRate"
                            name="taxRate"
                            value={settings.taxRate}
                            onChange={handleChange}
                            className={styles.input}
                            min="0"
                            max="100"
                            step="0.1"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FiLock style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        System Preferences
                    </h2>
                    <div className={styles.formGroup}>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className={styles.toggleInput}
                            />
                            <span className={styles.toggleSlider}></span>
                            <span className={styles.toggleLabel}>Maintenance Mode</span>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                name="allowReviews"
                                checked={settings.allowReviews}
                                onChange={handleChange}
                                className={styles.toggleInput}
                            />
                            <span className={styles.toggleSlider}></span>
                            <span className={styles.toggleLabel}>Allow Product Reviews</span>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                name="orderEmails"
                                checked={settings.orderEmails}
                                onChange={handleChange}
                                className={styles.toggleInput}
                            />
                            <span className={styles.toggleSlider}></span>
                            <span className={styles.toggleLabel}>Send Order Confirmation Emails</span>
                        </label>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.saveButton} disabled={loading}>
                        {loading ? 'Saving...' : (
                            <>
                                <FiSave style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
