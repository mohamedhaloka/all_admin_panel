import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Associations.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
        <div className="form-wrapper">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <button type="submit">Sign In</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignIn;
