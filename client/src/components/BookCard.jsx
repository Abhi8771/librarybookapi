import React from 'react';
import { Card, Button, ButtonGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/BookCard.css'; 
const BookCard = ({ book, role }) => {
  const { _id, name, author, imageUrl } = book;

  return (
    <Container>
    <Card className="book-card shadow-sm">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        className="book-image"
      />
      <Card.Body className="p-2 d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-6 mb-1 text-truncate">{name}</Card.Title>
          <Card.Text className="text-muted" style={{ fontSize: '0.85rem' }}>
            {author}
          </Card.Text>
        </div>
        {role === 'admin' && (
          <ButtonGroup className="d-flex gap-1 mt-2">
            <Link to={`/book/${_id}`} className="btn btn-sm btn-primary w-100">
              Edit
            </Link>
            <Link to={`/delete/${_id}`} className="btn btn-sm btn-danger w-100">
              Delete
            </Link>
          </ButtonGroup>
        )}
      </Card.Body>
    </Card>
    </Container>
  );
};

export default BookCard;
