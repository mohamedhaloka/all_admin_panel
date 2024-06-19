import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './CategoriesTable.css';

const AssociationsTable = () => {
    const [associations, setAssociations] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssociations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'associations'), orderBy('createdAt'));
                const associationsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(associationsData);
                setAssociations(associationsData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching associations: ', error);
            }
        };

        fetchAssociations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'associations', id));
            setAssociations(associations.filter(association => association.id !== id));
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
        navigate(`/edit-association/${id}`);
    };

    const handleAdd = () => {
        navigate('/add-association');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="container categories-table-page">
            <h2 className="my-4">Associations</h2>

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
                            <th>Name (Arabic)</th>
                            <th>Name (English)</th>
                            <th>Image</th>
                            <th>Cover</th>
                            <th>Bio</th>
                            <th>Facebook</th>
                            <th>Twitter</th>
                            <th>LinkedIn</th>
                            <th>Instagram</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {associations.map(association => (
                            <tr key={association.id}>
                                <td>{association.id}</td>
                                <td>{association.name}</td>
                                <td>{association.nameEn}</td>
                                <td>
                                    <img src={association.imageUrl} alt={association.name} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>
                                    <img src={association.coverUrl} alt={`${association.name} Cover`} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>{association.bio}</td>
                                <td>
                                    <a
                                        href={association.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'blue' }}
                                    >
                                        Facebook
                                    </a>
                                </td>
                                <td>
                                    <a
                                        href={association.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'blue' }}
                                    >
                                        Twitter
                                    </a>
                                </td>
                                <td>
                                    <a
                                        href={association.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'blue' }}
                                    >
                                        LinkedIn
                                    </a>
                                </td>
                                <td>
                                    <a
                                        href={association.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'blue' }}
                                    >
                                        Instagram
                                    </a>
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEdit(association.id)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => confirmDelete(association.id)}
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

export default AssociationsTable;
