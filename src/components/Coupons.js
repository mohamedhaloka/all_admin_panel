import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';


const Coupons = () => {
    const [couponName, setCouponName] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState(null);
    const [providerUrl, setProviderUrl] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const { id } = useParams(); // Get the category ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                console.log(id);
                const couponDoc = await getDoc(doc(db, 'coupons', id));
                if (couponDoc.exists()) {
                    const couponsData = couponDoc.data();
                    setCouponName(couponsData.name || '');
                    setDiscount(couponsData.extra || '');
                    setImageUrl(couponsData.image || '');
                    setProviderUrl(couponsData.url || '');
                } else {
                    console.error('Company not found');
                }
            } catch (error) {
                console.error('Error fetching company: ', error);
            }
        };

        if (id) {
            fetchCoupon();
        }
    }, [id]);

    function isValidURL(str) {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.([a-z]{2,})|(([\\d]{1,3}\\.){3}[\\d]{1,3}))|' + // domain name and extension or IP address (v4)
            'localhost|' + // localhost
            '\\[[0-9a-fA-F:]+\\])' + // IPv6 address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
        );
        return !!pattern.test(str);
    }

    const handleAddCompany = async (e) => {
        e.preventDefault();

        if (image == null && id == null) {
            console.error('Please select a image.');
            setError('Please select a image.');

            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);
        try {
            let imageUrl = '';

            if (image) {
                const storageRef = ref(storage, `images/${uuidv4()}`);
                const snapshot = await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const companyData = {
                name: couponName,
                extra: discount,
                url: providerUrl,
            };

            console.log('image ', image)
            if (image) {
                companyData["image"] = imageUrl
            }

            console.log(companyData);

            if (id) {
                // Update existing company
                await updateDoc(doc(db, 'coupons', id), companyData);
                setSuccess('Coupon updated successfully');
            } else {
                // Add new company
                await addDoc(collection(db, 'coupons'), companyData);
                setSuccess('Coupon added successfully');
            }

            setTimeout(() => {
                setLoading(false);
                navigate('/coupons-table');
            }, 2000);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '500px' }}>
                <div className="card-body">
                    <h2 className="mb-4 text-center display-4 fw-bold text-primary">{id ? 'Edit Coupon' : 'Add Coupon'}</h2>
                    <form onSubmit={handleAddCompany} className="row g-3">
                        <div className="col-12">
                            <input
                                type="text"
                                value={couponName}
                                onChange={(e) => setCouponName(e.target.value)}
                                className="form-control"
                                placeholder="Coupon"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className="form-control"
                                placeholder="Discount"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={providerUrl}
                                onChange={(e) => setProviderUrl(e.target.value)}
                                className="form-control"
                                placeholder="Url"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-12 text-center">
                            {imageUrl && (
                                <div className="mb-3">
                                    <img src={imageUrl} alt="Coupon" className="img-fluid" />

                                </div>
                            )}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Loading...' : id ? 'Update Coupon' : 'Add Coupon'}
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-danger mt-3">{error}</p>}
                    {success && <p className="text-success mt-3">{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default Coupons;
