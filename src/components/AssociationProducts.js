// src/components/AssociationProducts.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Associations.css';

const AssociationProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [titleEn, setTitleEn] = useState('');
    const [titleAr, setTitleAr] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [shareUrl, setShareUrl] = useState('');
    const [donateUrl, setDonateUrl] = useState('');
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'associations'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();

        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleRadioChange = (productId) => {
        setSelectedProduct(productId);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!selectedProduct) {
            setError('Please select a product.');
            return;
        }


        try {
            const productRef = doc(db, 'associations', selectedProduct);
            const subCollectionRef = collection(productRef, 'products');
            await setDoc(doc(subCollectionRef), {
                description: descriptionAr,
                descriptionEn: descriptionEn,
                donateUrl: donateUrl,
                image: imageUrl,
                title: titleAr,
                titleEn: titleEn,
                shareUrl: shareUrl,
            });

            setSuccess('Data added successfully');
            setSelectedProduct(null);
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
            <h2>Select a Product</h2>
            <ul className="products-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <label>
                            <input
                                type="radio"
                                name="product"
                                checked={selectedProduct === product.id}
                                onChange={() => handleRadioChange(product.id)}
                            />
                            {product.name}
                        </label>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    value={titleAr}
                    onChange={e => setTitleAr(e.target.value)}
                    placeholder="Title Ar"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={titleEn}
                    onChange={e => setTitleEn(e.target.value)}
                    placeholder="Title En"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={descriptionAr}
                    onChange={e => setDescriptionAr(e.target.value)}
                    placeholder="Description Ar"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={descriptionEn}
                    onChange={e => setDescriptionEn(e.target.value)}
                    placeholder="Description En"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="Image Url"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={donateUrl}
                    onChange={e => setDonateUrl(e.target.value)}
                    placeholder="Donate Url"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={shareUrl}
                    onChange={e => setShareUrl(e.target.value)}
                    placeholder="Share Url"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>
                    Submit
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AssociationProducts;
