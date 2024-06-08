// src/components/Associations.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Associations.css';

const Associations = () => {
    const [nameAr, setNameAr] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [bio, setBio] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddCompany = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addDoc(collection(db, 'associations'), {
                name: nameAr,
                nameEn: nameEn,
                imageUrl: imageUrl,
                coverUrl: coverUrl,
                facebook: facebook,
                x: twitter,
                instagram: instagram,
                linkedIn: linkedIn,
                bio: bio,

            });
            setSuccess('Company added successfully');
            setNameAr('');
            setBio('');
            setCoverUrl('');
            setNameEn('');
            setFacebook('');
            setLinkedIn('');
            setInstagram('');
            setTwitter('');
            setImageUrl('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Add a Association</h2>
            <form onSubmit={handleAddCompany} className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image Url"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}

                />
                <input
                    type="text"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="Cover Url"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}

                />
                <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="Name Ar"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="Name En"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="Facebook Url"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Twitter"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="LinkedIn"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />
                <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Instagram"
                    required
                    style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
                />

                <button type="submit">Add Association</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Associations;
