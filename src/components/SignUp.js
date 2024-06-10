import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Auth.css'; // Reuse the same CSS file for consistent styling

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Add a fade-in animation when the component mounts
        const signInContainer = document.querySelector('.signin-container');
        if (signInContainer) {
            signInContainer.classList.add('fade-in');
        }
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(userCredential.user));
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signin-container">
            <h2 className="signin-title">Sign Up</h2>
            <p >Please provide Us you email and password to create your account</p>
            <form onSubmit={handleSignUp} className="signin-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="signin-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="signin-input"
                />
                <button type="submit" className="signin-button">Sign Up</button>
            </form>
            {error && <p className="signin-error">{error}</p>}
            <p className="signin-text">
                Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;
