import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button
} from 'react-bootstrap';

const AddBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/book/add',
      { name, author, imageUrl },
      { withCredentials: true }
    )
      .then(res => {
        if (res.data.added) {
          navigate('/books');
        } else {
          alert("Failed to add book.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error adding book");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} id='add-book-container'>
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow-sm">
        <h3 className="text-center mb-4">Add Book</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="bookName">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="authorName">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Add Book
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddBook;
