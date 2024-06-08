// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './Associations.css';

const HomeProducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [titleAr, setTitleAr] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [shareUrl, setShareUrl] = useState('');
    const [donateUrl, setDonateUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                const categoriesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
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
            await addDoc(collection(db, 'products'), {
                title: titleAr,
                titleEn: titleEn,
                description: descriptionAr,
                descriptionEn: descriptionEn,
                image: imageUrl,
                donateUrl: donateUrl,
                shareUrl: shareUrl,
                categoryId: selectedCategory,
            });


            setSuccess('Data added successfully');
            setSelectedCategory("");
            setTitleAr('');
            setTitleEn('');
            setDescriptionAr('');
            setDescriptionEn('');
            setImageUrl('');
            setDonateUrl('');
            setShareUrl('');
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
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Product Image Url"
                    required
                />
                <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="Product Title Ar"
                    required
                />
                <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Product Title En"
                    required
                />
                <input
                    type="text"
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    placeholder="Product Description Ar"
                    required
                />
                <input
                    type="text"
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Product Description En"
                    required
                />
                <input
                    type="text"
                    value={donateUrl}
                    onChange={(e) => setDonateUrl(e.target.value)}
                    placeholder="Product Donate Url"
                    required
                />
                <input
                    type="text"
                    value={shareUrl}
                    onChange={(e) => setShareUrl(e.target.value)}
                    placeholder="Product Share Url"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

        </div>
    );
};

export default HomeProducts;
