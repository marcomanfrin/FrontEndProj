import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './ComponentLayout.css';

  const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'base'
  });

  const [message, setMessage] = useState(null);

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
  }

  try {
    if (isRegister) {
      // Register user
      const { firstName, lastName, email, password, role } = formData;

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role })
      });

      if (!response.ok) throw new Error("Registration failed.");
      setMessage("Registered successfully!");
    } 
    
    else {
      // Login user
      const response = await fetch(`http://localhost:3001/users?email=${formData.email}`);
      const users = await response.json();

      if (users.length === 0) {
        setMessage("No user found with this email.");
        return;
      }

      const user = users[0];
      if (user.password !== formData.password) {
        setMessage("Incorrect password.");
        return;
      }

      setMessage("Logged in successfully!");
      // Optionally save login state here (e.g., localStorage.setItem)
    }
  } catch (err) {
    console.error(err);
    setMessage("An error occurred.");
  }
};


  return (
    //<Container className="component-container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {isRegister ? "Register" : "Login"}
              </Card.Title>

              {message && <Alert variant="info">{message}</Alert>}

              <Form onSubmit={handleSubmit}>

                {isRegister && (
                  <>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="role">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="base">Base</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                    </Form.Group>
                  </>
                )}

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {isRegister && (
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                )}

                <Button variant="primary" type="submit" className="w-100">
                  {isRegister ? "Register" : "Login"}
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <Button variant="link" onClick={toggleMode}>
                  {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    //</Container>
  );
};

export default Login;
