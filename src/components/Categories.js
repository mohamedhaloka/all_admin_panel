import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import './Associations.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams(); // Get the category ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = [
                    {
                        'id': 'associations',
                        'name': 'Associations',
                    },
                    {
                        'id': 'products',
                        'name': 'Products',
                    },
                    {
                        'id': 'coupons',
                        'name': 'Coupons',
                    },
                ];
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                try {
                    const categoryDoc = await getDoc(doc(db, 'categories', id));
                    if (categoryDoc.exists()) {
                        const categoryData = categoryDoc.data();
                        setNameAr(categoryData.name);
                        setNameEn(categoryData.nameEn);
                        setSelectedCategory(categoryData.extra);
                    } else {
                        console.error('Category not found');
                    }
                } catch (error) {
                    console.error('Error fetching category: ', error);
                }
            };

            fetchCategory();
        }
    }, [id]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError('Please select a category.');
            return;
        }

        setLoading(true);
        try {
            const categoryData = {
                name: nameAr,
                nameEn: nameEn,
                extra: selectedCategory,
                createdAt: serverTimestamp(),
            };

            if (id) {
                await updateDoc(doc(db, 'categories', id), categoryData);
                setSuccess('Category updated successfully');
            } else {
                await addDoc(collection(db, 'categories'), categoryData);
                setSuccess('Category added successfully');
            }

            setTimeout(() => {
                setLoading(false);
                navigate('/categories-table');
            }, 2000);

            setSelectedCategory('');
            setNameAr('');
            setNameEn('');
        } catch (error) {
            console.error('Error submitting form: ', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await deleteDoc(doc(db, 'categories', id));
            navigate('/categories-table');
        } catch (error) {
            console.error('Error deleting category: ', error);
        }
    };

    return (
        <div className="center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-8">
                    <div className="card" style={{ width: '500px' }}>
                        <div className="card-body" >
                            <h2 className="mb-4 text-center display-4 fw-bold text-primary">{id ? 'Edit Category' : 'Add Category'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category:</label>
                                    <select
                                        id="category"
                                        className="form-select"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        <option value="">Select...</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nameAr" className="form-label">Name (Arabic):</label>
                                    <input
                                        type="text"
                                        id="nameAr"
                                        className="form-control"
                                        value={nameAr}
                                        onChange={(e) => setNameAr(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nameEn" className="form-label">Name (English):</label>
                                    <input
                                        type="text"
                                        id="nameEn"
                                        className="form-control"
                                        value={nameEn}
                                        onChange={(e) => setNameEn(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Loading...' : id ? 'Update' : 'Submit'}
                                    </button>
                                    {id && (
                                        <>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                                Delete
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/categories-table')}>
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                            {error && <p className="text-danger mt-3">{error}</p>}
                            {success && <p className="text-success mt-3">{success}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
