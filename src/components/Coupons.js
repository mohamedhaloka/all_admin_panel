// src/components/Companies.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Companies.css';

const Coupons = () => {
    const [companyNameAr, setCompanyNameAr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [discount, setDiscount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddCompany = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addDoc(collection(db, 'coupons'), {
                name: companyNameAr,
                extra: discount,
                image: imageUrl
            });
            setSuccess('Coupon added successfully');
            setCompanyNameAr('');
            setDiscount('');
            setImageUrl('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Add a Coupon</h2>
            <form onSubmit={handleAddCompany} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input
                    type="text"
                    value={companyNameAr}
                    onChange={(e) => setCompanyNameAr(e.target.value)}
                    placeholder="Coupon"
                    required
                />
                <input
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Discount Amount"
                    required
                />
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image"
                    required
                />
                <button type="submit">Add Coupon</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Coupons;
