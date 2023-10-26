import express from 'express';
const router = express.Router();
import { createClass, getAllClassrooms, getUserClassrooms, joinClass, getUserJoinedClasses, getStudentClassDetails, getClassDetailsById, getStudentsByIds } from '../controllers/classController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.post('/',createClass); 

// Get all classrooms (public route)
router.get('/all', getAllClassrooms);

// Get all classrooms (public route)
router.route('/user-classrooms').get(protect, getUserClassrooms);

// Join a class (protected route, only accessible by logged-in users)
router.post('/join', protect, joinClass);

// Add this route in your classRoutes.js file
router.get('/user-joined-classes', protect, getUserJoinedClasses);

// Add this route to your Express router
router.post('/student-class-details', protect, getStudentClassDetails);

// Add a route to get class details by ID
router.get('/:id', protect, getClassDetailsById);


// Route to get student details by their IDs
router.post('/students-by-ids', protect, getStudentsByIds);



export default router;
