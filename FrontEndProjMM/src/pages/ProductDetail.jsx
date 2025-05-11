import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import './ComponentLayout.css';

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router"

const ProductDetail = () => {

  //bivacco 
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("http://localhost:3001/bivacchi/" + productId)
        const product = await response.json()
        setProduct(product)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [productId])
  

  //comments
  const [comments, setComments] = useState([
    'Comment 1',
    'Comment 2',
    'Comment 3',
  ]);
  const [newComment, setNewComment] = useState('');
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  //loading
  if (loading) return <div>Loading product...</div>

  //error loading
  if (error)
    return (
      <div>
        <h2>{error}</h2>
      </div>
    )

  const { title, image, description } = product
  
  // page
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
              <Card.Title>"Info"</Card.Title>
              <Card.Text>
                {description || "No Description"}
              </Card.Text>
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
            {comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
