import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

const Login = ({ setRoleVar }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/login', { username, password, role })
      .then(res => {
        if (res.data.login && res.data.role === 'admin') {
          setRoleVar('admin');
          navigate('/dashboard');
        } else if (res.data.login && res.data.role === 'student') {
          setRoleVar('student');
          navigate('/');
        } else {
          setMessage(res.data.message || 'Login failed');
        }
      })
      .catch(err => {
        console.log(err);
        setMessage('An error occurred during login.');
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="text-center mb-4">Login</h2>

        {message && <Alert variant="danger">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
