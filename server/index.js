import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";
import { AdminRouter } from "./routes/auth.js";
import { studentRouter } from "./routes/student.js";
import { bookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { Student } from "./models/Student.js";
import { Admin } from "./models/Admin.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", AdminRouter);
app.use("/student", studentRouter);
app.use("/book", bookRouter);

app.get("/dashboard", async (req, res) => {
  try {
    const student = await Student.countDocuments();
    const admin = await Admin.countDocuments();
    const book = await Book.countDocuments();
    return res.json({ ok: true, student, book, admin });
  } catch (err) {
    return res.json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
