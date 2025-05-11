import React from 'react';
import { Card } from 'react-bootstrap';

const UserCard = ({ user }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/80"
          style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "1rem" }}
        />
        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
