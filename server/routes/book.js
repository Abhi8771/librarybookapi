import express from 'express';
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

// Add a new book (Admin only)
router.post('/add', verifyAdmin, async (req, res) => {
  try {
    const { name, author, imageUrl } = req.body;
    if (!name || !author || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({ name, author, imageUrl });
    await newBook.save();
    return res.json({ added: true });
  } catch (error) {
    return res.status(500).json({ message: "Error in adding book", error: error.message });
  }
});

// Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Get a book by ID
router.get('/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

// Update a book by ID
router.put('/book/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.json({ updated: true, book });
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error: error.message });
  }
});

// Delete a book by ID
router.delete('/book/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.json({ deleted: true, book });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

export { router as bookRouter };
