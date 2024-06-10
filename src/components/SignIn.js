import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css'; // Import the CSS file for styling

const SignIn = () => {
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

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(userCredential.user));
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signin-container">
            <h2 className="signin-title">Sign In</h2>
            <form onSubmit={handleSignIn} className="signin-form">
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
                <button type="submit" className="signin-button">Sign In</button>
            </form>
            {error && <p className="signin-error">{error}</p>}
            <p className="signin-text">
                Don't have an account? <Link to="/signup" className="signin-link">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignIn;
