import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

import './Associations.css';

const Associations = () => {
    const { associationId } = useParams(); // Get the category ID from the URL
    const [nameAr, setNameAr] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [imageFile, setImageFile] = useState(null); // State to store selected image file
    const [coverFile, setCoverFile] = useState(null); // State to store selected cover file
    const [imageUrl, setImageUrl] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [bio, setBio] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch association data for editing if associationId is provided
    useEffect(() => {
        const fetchAssociation = async () => {
            if (associationId) {
                try {
                    const associationDoc = await getDoc(doc(db, 'associations', associationId));
                    if (associationDoc.exists()) {
                        const associationData = associationDoc.data();
                        setNameAr(associationData.name || '');
                        setNameEn(associationData.nameEn || '');
                        setImageUrl(associationData.imageUrl || '');
                        setCoverUrl(associationData.coverUrl || '');
                        setBio(associationData.bio || '');
                        setFacebook(associationData.facebook || '');
                        setInstagram(associationData.instagram || '');
                        setLinkedIn(associationData.linkedIn || '');
                        setTwitter(associationData.twitter || '');
                    } else {
                        console.error('Association not found');
                    }
                } catch (error) {
                    console.error('Error fetching association:', error);
                }
            }
        };

        fetchAssociation();
    }, [associationId]);

    const handleAddOrUpdateAssociation = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            let imageUrlFromStorage = imageUrl;
            let coverUrlFromStorage = coverUrl;

            // Upload new image to storage if an image file is selected
            if (imageFile) {
                const imageStorageRef = ref(storage, `images/${uuidv4()}`);
                const imageSnapshot = await uploadBytes(imageStorageRef, imageFile);
                imageUrlFromStorage = await getDownloadURL(imageSnapshot.ref);
            }

            // Upload new cover image to storage if a cover image file is selected
            if (coverFile) {
                const coverStorageRef = ref(storage, `images/${uuidv4()}`);
                const coverSnapshot = await uploadBytes(coverStorageRef, coverFile);
                coverUrlFromStorage = await getDownloadURL(coverSnapshot.ref);
            }

            const associationData = {
                name: nameAr,
                nameEn: nameEn,
                imageUrl: imageUrlFromStorage,
                coverUrl: coverUrlFromStorage,
                bio: bio,
                facebook: facebook,
                instagram: instagram,
                linkedIn: linkedIn,
                twitter: twitter,
            };

            if (associationId) {
                // Update existing association
                await updateDoc(doc(db, 'associations', associationId), associationData);
                setSuccess('Association updated successfully');
            } else {
                // Add new association
                await addDoc(collection(db, 'associations'), associationData);
                setSuccess('Association added successfully');
            }

            // Reset form fields after submission
            setNameAr('');
            setNameEn('');
            setImageUrl('');
            setCoverUrl('');
            setBio('');
            setFacebook('');
            setInstagram('');
            setLinkedIn('');
            setTwitter('');
            setImageFile(null);
            setCoverFile(null);

        } catch (error) {
            console.error('Error adding/updating association:', error);
            setError(error.message);
        }

        setLoading(false);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleCoverChange = (e) => {
        if (e.target.files[0]) {
            setCoverFile(e.target.files[0]);
            setCoverUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="scrollable-container d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '50px', paddingTop: '50px' }}>
            <div className="card" style={{ width: '600px' }}>
                <div className="scrollable-container card-body">

                    <form onSubmit={handleAddOrUpdateAssociation} className="row g-3">
                        <h2 className="mb-4 text-center display-4 fw-bold text-primary">
                            {associationId ? 'Edit Association' : 'Add Association'}
                        </h2>
                        <div className="col-12">
                            <label className="form-label">Select Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="form-control"
                                required={!imageUrl}
                            />
                            {imageUrl && (
                                <img src={imageUrl} alt="Selected" className="img-fluid mt-3" style={{ maxWidth: '100%' }} />
                            )}
                        </div>
                        <div className="col-12">
                            <label className="form-label">Select Cover Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                className="form-control"
                                required={!coverUrl}
                            />
                            {coverUrl && (
                                <img src={coverUrl} alt="Selected Cover" className="img-fluid mt-3" style={{ maxWidth: '100%' }} />
                            )}
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={nameAr}
                                onChange={(e) => setNameAr(e.target.value)}
                                className="form-control"
                                placeholder="Name Ar"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={nameEn}
                                onChange={(e) => setNameEn(e.target.value)}
                                className="form-control"
                                placeholder="Name En"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="form-control"
                                placeholder="Bio"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                className="form-control"
                                placeholder="Facebook URL"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                className="form-control"
                                placeholder="Twitter URL"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={linkedIn}
                                onChange={(e) => setLinkedIn(e.target.value)}
                                className="form-control"
                                placeholder="LinkedIn URL"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="text"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                className="form-control"
                                placeholder="Instagram URL"
                                required
                            />
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                {loading ? 'Loading...' : associationId ? 'Update Association' : 'Add Association'}
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

export default Associations;
