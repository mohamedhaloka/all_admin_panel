import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './CategoriesTable.css';

const CouponsTable = () => {
    const [coupons, setCoupons] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'coupons'), orderBy('createdAt'));
                const couponsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCoupons(couponsData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching coupons: ', error);
            }
        };

        fetchCoupons();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'coupons', id));
            setCoupons(coupons.filter(coupon => coupon.id !== id));
            setShowConfirmDialog(false);
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowConfirmDialog(true);
    };

    const handleEdit = (id) => {
        navigate(`/edit-coupon/${id}`);
    };

    const handleAdd = () => {
        navigate('/add-coupon');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="container categories-table-page">
            <h2 className="my-4">Coupons</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-success mb-3" onClick={handleAdd}>
                    <i className="fas fa-plus"></i> Add New
                </button>
                <div className="d-flex">
                    <button className="btn btn-primary mb-3" onClick={handleGoHome}>
                        <i className="fas fa-home"></i>
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
                </div>
            ) : (
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Discount</th>
                            <th>Expiration Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(coupon => (
                            <tr key={coupon.id}>
                                <td>{coupon.id}</td>
                                <td>{coupon.name}</td>
                                <td>{coupon.discount}</td>
                                <td>{coupon.expirationDate}</td>
                                <td>
                                    <div className="d-flex">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEdit(coupon.id)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => confirmDelete(coupon.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <div className="confirm-dialog-content">
                        <p>Are you sure you want to delete this item?</p>
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => handleDelete(deleteId)}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowConfirmDialog(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponsTable;
