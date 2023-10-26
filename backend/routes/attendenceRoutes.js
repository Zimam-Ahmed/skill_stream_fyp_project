import express from 'express';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware
import {
  createOrUpdateAttendance,
} from '../controllers/attendenceController.js';

const router = express.Router();

// Route to create or update attendance
router.route('/').post(protect, createOrUpdateAttendance);


export default router; 
