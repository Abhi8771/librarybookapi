import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import { Container, Row, Col } from 'react-bootstrap';

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/book/books', { withCredentials: true })
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="py-4">
      <Row className="g-4">
        {books.map(book => (
          <Col key={book._id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} role={role} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Books;
