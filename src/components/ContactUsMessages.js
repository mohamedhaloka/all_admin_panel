import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Spinner, Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ContactUsMessages.css';

const ContactUsMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    const filteredMessages = messages.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Contact Us Messages</h2>
                <Button variant="primary" onClick={handleGoHome}>
                    <i className="fas fa-home me-2" />
                </Button>
            </div>
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    {filteredMessages.length === 0 ? (
                        <Col>
                            <p className="text-center">No messages found.</p>
                        </Col>
                    ) : (
                        filteredMessages.map((message) => (
                            <Col key={message.id} md={6} lg={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{message.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{message.email}</Card.Subtitle>
                                        <Card.Text>{message.message}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            )}
        </Container>
    );
};

export default ContactUsMessages;
