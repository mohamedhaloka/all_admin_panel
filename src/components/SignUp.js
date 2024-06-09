import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Associations.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
        <div className="form-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;
