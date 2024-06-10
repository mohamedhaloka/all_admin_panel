import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Settings.css';

const Settings = () => {
    const { docId } = useParams();
    const [data, setData] = useState({});
    const [updatedData, setUpdatedData] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Set loading state to true initially

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
            } finally {
                setLoading(false); // Set loading to false after data fetching completes
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            {loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="card" style={{ width: '500px' }}>
                    <div className="card-body">
                        <h2 className="mb-4 text-center display-4 fw-bold text-primary">Settings</h2>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-12">
                                <label htmlFor="aboutApp" className="form-label">About app:</label>
                                <input
                                    type="text"
                                    id="aboutApp"
                                    name="aboutApp"
                                    value={updatedData.aboutApp || data.aboutApp || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="appStore" className="form-label">App Store Url:</label>
                                <input
                                    type="text"
                                    id="appStore"
                                    name="appStore"
                                    value={updatedData.appStore || data.appStore || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={updatedData.email || data.email || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="facebook" className="form-label">Facebook Url:</label>
                                <input
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={updatedData.facebook || data.facebook || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="googlePlay" className="form-label">Google Play Url:</label>
                                <input
                                    type="text"
                                    id="googlePlay"
                                    name="googlePlay"
                                    value={updatedData.googlePlay || data.googlePlay || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="instagram" className="form-label">Instagram Url:</label>
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    value={updatedData.instagram || data.instagram || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="privacyPolicy" className="form-label">Privacy Policy:</label>
                                <input
                                    type="text"
                                    id="privacyPolicy"
                                    name="privacyPolicy"
                                    value={updatedData.privacyPolicy || data.privacyPolicy || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="termsAndConditions" className="form-label">Terms and Conditions:</label>
                                <input
                                    type="text"
                                    id="termsAndConditions"
                                    name="termsAndConditions"
                                    value={updatedData.termsAndConditions || data.termsAndConditions || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="whatsApp" className="form-label">Whatsapp:</label>
                                <input
                                    type="text"
                                    id="whatsApp"
                                    name="whatsApp"
                                    value={updatedData.whatsApp || data.whatsApp || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="x" className="form-label">Twitter Url:</label>
                                <input
                                    type="text"
                                    id="x"
                                    name="x"
                                    value={updatedData.x || data.x || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="youtube" className="form-label">Youtube:</label>
                                <input
                                    type="text"
                                    id="youtube"
                                    name="youtube"
                                    value={updatedData.youtube || data.youtube || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary" disabled={!!success}>
                                    Submit
                                </button>
                            </div>
                        </form>
                        {error && <p className="text-danger mt-3">{error}</p>}
                        {success && <p className="text-success mt-3">{success}</p>}
                    </div>
                </div>
            )}
        </div>



    );
};

export default Settings;
