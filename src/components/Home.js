import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './ContactUsMessages.css';

const Home = () => {
    const [userEmail, setUserEmail] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
                navigate('/signin');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);


    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                navigate('/signin');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    const navigateToCategories = () => {
        navigate('/categories');
    };

    const navigateToCompanies = () => {
        navigate('/companies');
    };


    const navigateToCategoriesTable = () => {
        navigate('/categories-table');
    };


    const navigateToAssociationProducts = () => {
        navigate('/association-products');
    };

    const navigateToContactUs = () => {
        navigate('/contact-us-messages');
    };


    const navigateToAssociations = () => {
        navigate('/associations');
    };

    const navigateToSettings = () => {
        navigate('/settings');
    };

    const navigateToCoupons = () => {
        navigate('/coupons');
    };


    const navigateToHomeProducts = () => {
        navigate('/home-products');
    };

    return (
        <div className="center">
            <h2>Home Page</h2>
            <p>Welcome {userEmail} to "All" Admin Panel!</p>
            <button onClick={navigateToCategoriesTable} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Categories</button>
            <button onClick={navigateToHomeProducts} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Home Products</button>
            <button onClick={navigateToCompanies} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Companies</button>
            <button onClick={navigateToCoupons} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Coupons</button>
            <button onClick={navigateToAssociations} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Associations</button>
            <button onClick={navigateToAssociationProducts} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Association Products</button>
            <button onClick={navigateToContactUs} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Contact Us Messages</button>
            <button onClick={navigateToSettings} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Settings</button>
            <button onClick={handleLogout} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>Log Out</button>
        </div>
    );
};

export default Home;
