import express from 'express';
import { createSubmission, createSubmissionController, checkPreviousSubmission, getSubmissionsForClass, viewSubmissionFile, downloadSubmissionFile, updateObtainedPointsForSubmission, getSubmissionsForUser } from '../controllers/submissionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a classwork submission
router.post('/', protect, createSubmission, createSubmissionController);

// Route to get submissions based on classId
router.get('/:classworkId', protect, getSubmissionsForClass);

// Route to view a submission file
router.get('/view/:classworkId/:filename', protect, viewSubmissionFile);

// Download Submission File (New route for downloading)
router.route('/download/:classworkId').get(downloadSubmissionFile);

router.put('/updateObtainedPoints/:classworkId/:filename', updateObtainedPointsForSubmission);

router.get('/submission/user', protect, getSubmissionsForUser);

export default router;
