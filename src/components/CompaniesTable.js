// src/components/CompaniesTable.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './CategoriesTable.css';

const CompaniesTable = () => {
    const [companies, setCompanies] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'companies'), orderBy('createdAt'));
                const companiesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCompanies(companiesData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching companies: ', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'companies', id));
            setCompanies(companies.filter(company => company.id !== id));
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
        navigate(`/edit-company/${id}`);
    };

    const handleAdd = () => {
        navigate('/add-company');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="container categories-table-page">
            <h2 className="my-4">Companies</h2>

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
                            <th>Name Ar</th>
                            <th>Name En</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.nameEn}</td>
                                <td>
                                    <img src={company.imageUrl} alt={company.name} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEdit(company.id)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => confirmDelete(company.id)}
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

export default CompaniesTable;
