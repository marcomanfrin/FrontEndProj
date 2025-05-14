import React from 'react';
import { Card } from 'react-bootstrap';

const ListCard = ({ title, data }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{data}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
