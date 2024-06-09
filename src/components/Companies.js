import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import './Companies.css';

const Companies = ({ companyId }) => {
    const [companyNameAr, setCompanyNameAr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [companyNameEn, setCompanyNameEn] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const companyDoc = await getDoc(doc(db, 'companies', companyId));
                if (companyDoc.exists()) {
                    const companyData = companyDoc.data();
                    setCompanyNameAr(companyData.name || '');
                    setCompanyNameEn(companyData.nameEn || '');
                    setImageUrl(companyData.imageUrl || '');
                } else {
                    console.error('Company not found');
                }
            } catch (error) {
                console.error('Error fetching company: ', error);
            }
        };

        if (companyId) {
            fetchCompany();
        }
    }, [companyId]);

    const handleAddCompany = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            if (companyId) {
                // Update existing company
                await updateDoc(doc(db, 'companies', companyId), {
                    name: companyNameAr,
                    nameEn: companyNameEn,
                    imageUrl: imageUrl
                });
                setSuccess('Company updated successfully');
            } else {
                // Add new company
                await addDoc(collection(db, 'companies'), {
                    name: companyNameAr,
                    nameEn: companyNameEn,
                    imageUrl: imageUrl
                });
                setSuccess('Company added successfully');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>{companyId ? 'Edit Company' : 'Add a Company'}</h2>
            <form onSubmit={handleAddCompany} className="row g-3">
                <div className="col-12">
                    <input
                        type="text"
                        value={companyNameAr}
                        onChange={(e) => setCompanyNameAr(e.target.value)}
                        className="form-control"
                        placeholder="Company Name Ar"
                        required
                    />
                </div>
                <div className="col-12">
                    <input
                        type="text"
                        value={companyNameEn}
                        onChange={(e) => setCompanyNameEn(e.target.value)}
                        className="form-control"
                        placeholder="Company Name En"
                        required
                    />
                </div>
                <div className="col-12">
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="form-control"
                        placeholder="Image Url"
                        required
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        {loading ? 'Loading...' : companyId ? 'Update Company' : 'Add Company'}
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Companies;
