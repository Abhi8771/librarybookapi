import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const Dashboard = () => {
  const [students, setStudents] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [books, setBooks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/dashboard', { withCredentials: true })
      .then((res) => {
        if (res.data.ok) {
          setStudents(res.data.student);
          setAdmin(res.data.admin);
          setBooks(res.data.book);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4 justify-content-center">
          <Col xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Books</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{books}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Students</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{students}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Admins</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{admin}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
