// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Associations.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [nameAr, setNameAr] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

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

                ].map(doc => ({
                    id: doc.id,
                    ...doc,
                }));
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            console.error('Please select a category.');
            setError('Please select a product.');

            return;
        }

        try {
            await addDoc(collection(db, 'categories'), {
                name: nameAr,
                nameEn: nameEn,
                extra: selectedCategory,
            });


            setSuccess('Data added successfully');
            setSelectedCategory("");
            setNameAr('');
            setNameEn('');
        } catch (error) {
            console.error('Error adding document: ', error);
            setError(error.message);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Categories</h2>
            <form onSubmit={handleSubmit} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <div className="form-group">
                    <label htmlFor="category">Select a Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        required
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    >
                        <option value="">Select...</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="nameAr">Name Ar:</label>
                    <input
                        type="text"
                        id="Name Ar"
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        required
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nameEn">Name En:</label>
                    <input
                        type="text"
                        id="Name En"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                        required
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

        </div>
    );
};

export default Categories;
