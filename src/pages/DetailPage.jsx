import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Meteo from '../components/Meteo'; 
import VisitatoButton from '../components/visitedBtn';
import SaveButton from '../components/saveBtn';
import { API_URL } from '../config'; 
import '../style/ComponentLayout.css'

// DetailPage component displays detailed information about a specific bivacco, including its details, weather, and comments.

const DetailPage = () => {
    // State to hold the bivacco product details
    const [product, setProduct] = useState(null);
    // State to hold the list of comments for the bivacco
    const [comments, setComments] = useState([]);
    // State to hold the new comment input by the user
    const [newComment, setNewComment] = useState('');
    // State to indicate if the data is currently loading
    const [loading, setLoading] = useState(true);
    // State to hold any error message from fetching data
    const [error, setError] = useState(null);

    const { bivaccoId } = useParams();

    // Fetch bivacco details when the component mounts or when bivaccoId changes
    useEffect(() => {
        const fetchBivaccoDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                // Make API call to fetch bivacco details by ID
                const response = await fetch(`${API_URL}/bivacchi/${bivaccoId}`);
                if (!response.ok) throw new Error('Failed to fetch bivacco details');
                const bivaccoData = await response.json();
                // Update state with fetched bivacco data and comments
                setProduct(bivaccoData);
                setComments(bivaccoData.comments || []);
            } catch (error) {
                // Set error message if API call fails
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBivaccoDetail();
    }, [bivaccoId]);

    // Handles submission of a new comment for the bivacco
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // Trim the comment input and ignore if empty
        const trimmedComment = newComment.trim();
        if (trimmedComment === '') return;

        // Create new comment object with unique ID
        const newCommentObj = {
            id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
            text: trimmedComment,
        };

        // Prepare updated comments array including the new comment
        const updatedComments = [...comments, newCommentObj];

        try {
            // Send PATCH request to update comments on the server
            const response = await fetch(`${API_URL}/bivacchi/${bivaccoId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comments: updatedComments }),
            });

            if (!response.ok) throw new Error('Failed to update comments');

            // Update local comments state and clear input field
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }
    };

    if (loading) return <div>Loading bivacchi...</div>;
    if (error) return <div><h2>{error}</h2></div>;
    if (!product) return <div>No bivacchi found</div>;

    const { title, image, description, place, difficulty, duration, length,  heightDifference, maxHeight, category} = product;

    return (
        <Container className="bivacco-container mt-4">
            {/* Title and Visitato Button */}
            <h1 className="bivacco-title mb-4">{title}</h1>
            <VisitatoButton bivaccoId={bivaccoId} />
            <SaveButton bivaccoId={bivaccoId} />
            <Row>
                {/* Image and Meteo Section */}
                <Col md={6} className="bivacco-image-container">
                    <img src={image} alt={title} className="img-fluid" />
                    <p> </p>
                    <Card className="mb-3 weather-container bivacco-meteo">
                      <Meteo location={place} />
                    </Card>
                </Col>
                {/* Details Section */}
                <Col md={6}>
                    <Card className="mb-3 bivacco-description">
                        <Card.Body>
                            <Card.Text>{description || 'No Description'}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3 bivacco-details">
                        <Card.Body>
                            <ul>
                                <li>Category: {category || 'Unknown'}</li>
                                <li>Difficulty: {difficulty || 'Unknown'}</li>
                                <li>Place: {place || 'Unknown'}</li>
                                <li>Length: {length || 'Unknown'}</li>
                                <li>HeightDifference: {heightDifference || 'Unknown'}</li>
                                <li>MaxHeight: {maxHeight || 'Unknown'}</li>
                                <li>Duration: {duration || 'Unknown'}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Comments Section */}
            <Card className="mt-4 bivacco-comments">
                <Card.Body>
                    <Card.Title>Comments</Card.Title>
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group controlId="commentInput">
                            <Form.Control
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Submit
                        </Button>
                    </Form>
                    <ListGroup variant="flush" className="mt-3">
                        {comments.map((comment) => (
                            <ListGroup.Item key={comment.id}>
                                {comment.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetailPage;
