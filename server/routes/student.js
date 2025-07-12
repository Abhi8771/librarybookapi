import express from 'express'
import {Student} from '../models/Student.js';
import bcrypt from 'bcrypt'
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register',verifyAdmin, async (req, res) =>{
    try {
        const {username, password, roll, grade} = req.body

        if (!username || !password || !roll || !grade) {
      return res.status(400).json({ message: "All fields are required" });
    }
        const student = await Student.findOne({username})
        if(student){
            return res.json({message: "student is registered"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newStudent = new Student({
            username,
            password: hashPassword,
            roll: roll,
            grade

        })
        await newStudent.save()
        return res.json({registered: true})
    } catch (error) {
        return res.status(500).json({ message: "Error in registering student", error: error.message });
    }
})

export {router as studentRouter}