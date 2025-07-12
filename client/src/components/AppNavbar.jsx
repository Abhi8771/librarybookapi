import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = ({ role }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Book Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/books">Books</Nav.Link>
            {role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/addbook">Add Book</Nav.Link>
                <Nav.Link as={Link} to="/addstudent">Add Student</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {role === '' ? (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
