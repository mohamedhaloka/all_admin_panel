// src/components/Companies.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './CategoriesTable.css';

const Companies = () => {
    const [companyNameAr, setCompanyNameAr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [companyNameEn, setCompanyNameEn] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddCompany = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addDoc(collection(db, 'companies'), {
                name: companyNameAr,
                nameEn: companyNameEn,
                imageUrl: imageUrl
            });
            setSuccess('Company added successfully');
            setCompanyNameAr('');
            setCompanyNameEn('');
            setImageUrl('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Add a Company</h2>
            <form onSubmit={handleAddCompany} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input
                    type="text"
                    value={companyNameAr}
                    onChange={(e) => setCompanyNameAr(e.target.value)}
                    placeholder="Company Name Ar"
                    required
                />
                <input
                    type="text"
                    value={companyNameEn}
                    onChange={(e) => setCompanyNameEn(e.target.value)}
                    placeholder="Company Name En"
                    required
                />
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image Url"
                    required
                />
                <button type="submit">Add Company</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Companies;
