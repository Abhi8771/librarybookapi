import express from 'express';
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log("Login attempt:", { username, role });

    if (role === 'admin') {
      const admin = await Admin.findOne({ username });
      if (!admin) return res.json({ message: "Admin not registered" });

      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) return res.json({ message: "Wrong password" });

      const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_key);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      return res.json({ login: true, role: 'admin' });

    } else if (role === 'student') {
      const student = await Student.findOne({ username });
      if (!student) return res.json({ message: "Student not registered" });

      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) return res.json({ message: "Wrong password" });

      const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_key);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      return res.json({ login: true, role: 'student' });

    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

  jwt.verify(token, process.env.Admin_key, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid admin token" });
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

  jwt.verify(token, process.env.Admin_key, (err, decoded) => {
    if (!err) {
      req.username = decoded.username;
      req.role = decoded.role;
      return next();
    }

    jwt.verify(token, process.env.Student_key, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    });
  });
};

router.get('/verify', verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
