// src/components/ContactUsMessages.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './ContactUsMessages.css';

const ContactUsMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contactMessages'));
                const messagesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(messagesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages: ', error);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div className="center">Loading...</div>;
    }

    return (
        <div className="center">
            <h2>Contact Us Messages</h2>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Name:</strong> {message.name} <br />
                            <strong>Email:</strong> {message.email} <br />
                            <strong>Message:</strong> {message.message} <br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactUsMessages;
