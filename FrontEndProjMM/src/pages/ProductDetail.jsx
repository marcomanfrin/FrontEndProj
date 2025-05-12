import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import './ComponentLayout.css';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productId } = useParams();
  const navigate = useNavigate();

  // Fetch product and comments
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/bivacchi/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const productData = await response.json();
        setProduct(productData);
        setComments(productData.comments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();
    if (trimmedComment === '') return;

    const newCommentObj = {
      id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
      text: trimmedComment,
    };

    const updatedComments = [...comments, newCommentObj];

    try {
      const response = await fetch(`http://localhost:3001/bivacchi/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: updatedComments }),
      });

      if (!response.ok) throw new Error("Failed to update comments");

      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div><h2>{error}</h2></div>;
  if (!product) return <div>No product found</div>;

  const { title, image, description } = product;

  return (
    <Container className="component-container mt-4">
      <h1 className="mb-4">{title}</h1>
      <Row>
        <Col md={6}>
          <img
            src={image}
            alt={title}
            className="img-fluid component-img"
          />
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Info</Card.Title>
              <Card.Text>{description || "No Description"}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Meteo</Card.Title>
              <Row>
                <Col>D1</Col>
                <Col>D2</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
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

export default ProductDetail;
