import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';

const EditBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/book/book/${id}`, { withCredentials: true })
      .then((res) => {
        setName(res.data.name);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/book/book/${id}`,
        { name, author, imageUrl },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.updated) {
          navigate('/books');
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
        <h3 className="text-center mb-4">Edit Book</h3>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBookName">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Update Book
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default EditBook;
