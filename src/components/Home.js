import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Home.css';

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

    const navigateTo = (path) => () => navigate(path);

    return (
        <div className="center">
            <div className="card">
                <h2 className="card-title">Home Page</h2>
                <p className="card-text">Welcome {userEmail} to "All" Admin Panel!</p>
                <div className="button-container">
                    <button onClick={navigateTo('/categories-table')} className="btn btn-primary">Categories</button>
                    <button onClick={navigateTo('/home-products')} className="btn btn-primary">Home Products</button>
                    <button onClick={navigateTo('/companies-table')} className="btn btn-primary">Companies</button>
                    <button onClick={navigateTo('/coupons-table')} className="btn btn-primary">Coupons</button>
                    <button onClick={navigateTo('/associations')} className="btn btn-primary">Associations</button>
                    <button onClick={navigateTo('/association-products')} className="btn btn-primary">Association Products</button>
                    <button onClick={navigateTo('/contact-us-messages')} className="btn btn-primary">Contact Us Messages</button>
                    <button onClick={navigateTo('/settings')} className="btn btn-secondary">Settings</button>
                    <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
