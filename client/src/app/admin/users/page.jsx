'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useGetUsersQuery, useDeleteUserMutation } from '../../../redux/slices/usersApiSlice';
import { FiEdit, FiTrash2, FiCheck, FiX, FiShield } from 'react-icons/fi';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';
import styles from './users.module.css';

export default function AdminUsersPage() {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

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
            await deleteUser(id).unwrap();
            refetch();
            toast.success('User deleted successfully');
            setDeleteConfirmId(null);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete user');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Manage Users</h1>
                    <p className={styles.subtitle}>View and manage all registered users</p>
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className={styles.error}>{error?.data?.message || 'Failed to load users'}</div>
            ) : (
                <>
                    <div className={styles.statsBar}>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Total Users:</span>
                            <span className={styles.statValue}>{users?.length || 0}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Admins:</span>
                            <span className={styles.statValue}>
                                {users?.filter(u => u.isAdmin).length || 0}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Regular Users:</span>
                            <span className={styles.statValue}>
                                {users?.filter(u => !u.isAdmin).length || 0}
                            </span>
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user._id}>
                                        <td className={styles.userId}>#{user._id.substring(0, 8)}</td>
                                        <td className={styles.userName}>{user.name}</td>
                                        <td className={styles.userEmail}>{user.email}</td>
                                        <td>
                                            {user.isAdmin ? (
                                                <span className={styles.statusAdmin}>
                                                    <FiShield /> Admin
                                                </span>
                                            ) : (
                                                <span className={styles.statusUser}>
                                                    <FiX /> User
                                                </span>
                                            )}
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                                                    className={styles.editButton}
                                                >
                                                    <FiEdit /> Edit
                                                </button>
                                                {user._id !== userInfo._id && (
                                                    <button
                                                        onClick={() => setDeleteConfirmId(user._id)}
                                                        className={styles.deleteButton}
                                                        disabled={loadingDelete}
                                                    >
                                                        <FiTrash2 /> Delete
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
                            Are you sure you want to delete this user? This action cannot be undone.
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
                                {loadingDelete ? 'Deleting...' : 'Delete User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
