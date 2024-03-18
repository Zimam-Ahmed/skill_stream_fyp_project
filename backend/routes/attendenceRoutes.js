import express from 'express';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware
import {
  createOrUpdateAttendance,
  getAttendanceByClassAndUser,
} from '../controllers/attendenceController.js';

const router = express.Router();

router.post('/:classId',protect, createOrUpdateAttendance);


router.get('/attendance/:classId',protect, getAttendanceByClassAndUser);

export default router; 
