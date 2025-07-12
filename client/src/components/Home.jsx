import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/books');
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h1 className="display-4 fw-bold">Book Shop</h1>
            <p className="lead mt-3">
              Browse the collection of our best and most interesting books.  
              You’ll definitely find what you're looking for.
            </p>
            <Button variant="primary" size="lg" className="mt-3" onClick={handleExplore}>
              Explore Books
            </Button>
          </Col>
          <Col md={6} className="text-center mt-4 mt-md-0">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="Books"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
