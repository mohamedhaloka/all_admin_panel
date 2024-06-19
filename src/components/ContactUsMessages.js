import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Spinner, Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faTrashAlt, faReply } from '@fortawesome/free-solid-svg-icons';
import './ContactUsMessages.css'; // Custom CSS for additional styling

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

    const handleDeleteMessage = async (id) => {
        try {
            await deleteDoc(doc(db, 'contactMessages', id));
            setMessages(messages.filter((message) => message.id !== id));
            console.log('Message deleted successfully');
        } catch (error) {
            console.error('Error deleting message: ', error);
        }
    };

    const filteredMessages = messages.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Contact Us Messages</h2>
                <Button variant="outline-primary" onClick={handleGoHome}>
                    <FontAwesomeIcon icon={faHome} className="me-2" /> Go Home
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
                <Row xs={1} md={2} className="g-4">
                    {filteredMessages.length === 0 ? (
                        <Col>
                            <p className="text-center">No messages found.</p>
                        </Col>
                    ) : (
                        filteredMessages.map((message) => (
                            <Col key={message.id} className="mb-4">
                                <Card className="h-100 shadow">
                                    <Card.Body>
                                        <Card.Title>{message.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <FontAwesomeIcon icon={faEnvelope} className="me-1" />
                                            {message.email}
                                        </Card.Subtitle>
                                        <Card.Text>{message.message}</Card.Text>
                                        {/* <div className="mt-3 text-end">
                                            <Button variant="info" size="sm" className="me-2">
                                                <FontAwesomeIcon icon={faReply} className="me-1" />
                                                Reply
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                                                <FontAwesomeIcon icon={faTrashAlt} className="me-1" />
                                                Delete
                                            </Button>
                                        </div> */}
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
