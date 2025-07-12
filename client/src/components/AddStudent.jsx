import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';

export const AddStudent = () => {
  const [username, setUsername] = useState('');
  const [grade, setGrade] = useState('');
  const [password, setPassword] = useState('');
  const [roll, setRoll] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:3001/student/register',
      { roll, username, password, grade },
      { withCredentials: true }
    )
      .then(res => {
        if (res.data.registered) {
          navigate('/dashboard');
        } else {
          alert("Registration failed");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error registering student");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center"  style={{ minHeight: '100vh'}}>
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow-sm">
        <h3 className="text-center mb-4">Add Student</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="roll">
            <Form.Label>Roll No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="grade">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddStudent;
