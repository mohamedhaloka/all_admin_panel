import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig'; // Assuming you have storage configured in your firebaseConfig
import { collection, addDoc, updateDoc, getDoc, doc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import './Companies.css';

const Coupons = () => {
    const [companyNameAr, setCompanyNameAr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [discount, setDiscount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { id } = useParams(); // Get the coupon ID from the URL
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        // If in edit mode, fetch coupon data
        if (id) {
            const fetchCouponData = async () => {
                try {
                    // Assuming you have a 'coupons' collection with documents containing the coupon data
                    const docSnap = await getDoc(doc(db, 'coupons', id));
                    if (docSnap.exists()) {
                        const couponData = docSnap.data();
                        setCompanyNameAr(couponData.name);
                        setDiscount(couponData.extra);
                        setImageUrl(couponData.image);
                    } else {
                        setError('Coupon not found');
                    }
                } catch (error) {
                    console.error('Error fetching coupon data:', error);
                    setError('Error fetching coupon data');
                }
            };

            fetchCouponData();
        }
    }, [id]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

    };

    const handleAddEditCoupon = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (id) {
                await updateDoc(doc(db, 'coupons', id), {
                    name: companyNameAr,
                    extra: discount,
                    image: imageUrl
                });
            } else {
                // const storageRef = storage.ref();
                // const imageRef = storageRef.child(`images/${file.name}`);

                // try {
                //     await imageRef.put(file);
                //     const url = await imageRef.getDownloadURL();
                //     setImageUrl(url);
                // } catch (error) {
                //     console.error('Error uploading image:', error);
                //     setError('Error uploading image');
                // }


                await addDoc(collection(db, 'coupons'), {
                    name: companyNameAr,
                    extra: discount,
                    image: imageUrl
                });
            }
            setSuccess('Coupon saved successfully');
        } catch (error) {
            console.error('Error saving coupon:', error);
            setError('Error saving coupon');
        }
    };

    return (
        <div className="form-wrapper">
            <h2>{id ? 'Edit Coupon' : 'Add Coupon'}</h2>
            <form onSubmit={handleAddEditCoupon} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required={!id} // Image upload required only for adding new coupon
                />
                <button type="submit">{id ? 'Save Changes' : 'Add Coupon'}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Coupons;
