// src/components/AdminDashboard.js
import React from 'react';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, query, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
    const handleSignOut = () => {
        signOut(auth);
    };

    const fetchData = async () => {
        const q = query(collection(db, "your-collection"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    );
};

export default AdminDashboard;
