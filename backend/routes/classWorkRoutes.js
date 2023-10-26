import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware.js';
import {
  createClassWork,
  createClassWorkController,
  getClassworksByClassId,
  getClassWorkDetailsById,
  downloadClassworkFile,
  
} from '../controllers/classWorkController.js';


// Create classwork
router.post('/', protect, createClassWork, createClassWorkController);

// Route to get all classworks by classId
router.route('/classworks/:classId').get(protect, getClassworksByClassId);

// Add a route to get classwork details by ID
router.route('/:classworkId').get(protect, getClassWorkDetailsById);

// Add a route to download a classwork file by ID
router.route('/download/:classworkId').get(protect, downloadClassworkFile);


export default router;
