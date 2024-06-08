// src/components/Settings.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Associations.css';

const Settings = () => {
    const { docId } = useParams();
    const [data, setData] = useState({});
    const [updatedData, setUpdatedData] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'appData', 'settings');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    setError('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
                setError('Error fetching document');
            }
        };

        fetchData();
    }, [docId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleSubmit = async (e) => {
        setSuccess('');
        setError('');
        e.preventDefault();
        try {
            const docRef = doc(db, 'appData', 'settings');
            await updateDoc(docRef, updatedData);
            setSuccess('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            setError('Error updating document');
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Settings</h2>
            <form onSubmit={handleSubmit} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <div className="form-group">
                    <label htmlFor="aboutApp">About app:  </label>
                    <input
                        type="text"
                        id="aboutApp"
                        name="aboutApp"
                        value={updatedData.aboutApp || data.aboutApp || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="appStore">App Store Url:</label>
                    <input
                        type="text"
                        id="appStore"
                        name="appStore"
                        value={updatedData.appStore || data.appStore || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={updatedData.email || data.email || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="facebook">Facebook Url:</label>
                    <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={updatedData.facebook || data.facebook || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="googlePlay">Google Play Url:</label>
                    <input
                        type="text"
                        id="googlePlay"
                        name="googlePlay"
                        value={updatedData.googlePlay || data.googlePlay || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Instagram Url:</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={updatedData.instagram || data.instagram || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="privacyPolicy">Privacy Policy:</label>
                    <input
                        type="text"
                        id="privacyPolicy"
                        name="privacyPolicy"
                        value={updatedData.privacyPolicy || data.privacyPolicy || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="termsAndConditions">Terms and Conditions:</label>
                    <input
                        type="text"
                        id="termsAndConditions"
                        name="termsAndConditions"
                        value={updatedData.termsAndConditions || data.termsAndConditions || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="whatsApp">Whatsapp:</label>
                    <input
                        type="text"
                        id="whatsApp"
                        name="whatsApp"
                        value={updatedData.whatsApp || data.whatsApp || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="x">Twitter Url:</label>
                    <input
                        type="text"
                        id="x"
                        name="x"
                        value={updatedData.x || data.x || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="youtube">Youtube:</label>
                    <input
                        type="text"
                        id="youtube"
                        name="youtube"
                        value={updatedData.youtube || data.youtube || ''}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default Settings;
