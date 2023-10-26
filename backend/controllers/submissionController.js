import Submission from '../models/submissionModel.js';
import Classwork from '../models/classWorkModel.js'
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    const folder = path.join('public', 'submission', req.body.classworkId.replace(/ /g, '_'));
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const createSubmission = upload.single('file');

const createSubmissionController = asyncHandler(async (req, res) => {
  try {
    if (req.file) {
      
      const { classworkId } = req.body;
      const studentId = req.user._id; 
    

      const submission = await Submission.create({
        studentId,
        classworkId,
        file: req.file.filename,
      });

      res.status(201).json({
        _id: submission._id,
        studentId: submission.studentId,
        classworkId: submission.classworkId,
        submissionDate: submission.submissionDate,
        file: {
          filename: req.file.filename,
        },
      });
    } else {
      res.status(400).json({ message: 'No file provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


const checkPreviousSubmission = asyncHandler(async (req, res) => {
  try {
    const { classworkId } = req.body;
    const studentId = req.user._id;

    const existingSubmission = await Submission.findOne({
      classworkId,
      studentId,
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted for this classwork' });
    }

    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getSubmissionsForClass = asyncHandler(async (req, res) => {
  try {
    const { classworkId } = req.params; // Get the classworkId from the URL parameters
    
    // Query the Submissions collection to get submissions that match the provided classworkId
    const submissions = await Submission.find({ classworkId }, '_id studentId submissionDate file').populate('studentId', 'name');

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const downloadSubmissionFile = async (req, res) => {
  const { classworkId } = req.params;
  const filePath = path.join(__dirname, 'public', 'submission', classworkId.replace(/ /g, '_'), filename);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: 'Failed to download the file' });
        }
      });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


const viewSubmissionFile = async (req, res) => {
  const { classworkId, filename } = req.params;

  // Use a relative path from the current module to access the file
  const filePath = path.join(process.cwd(), 'public', 'submission', classworkId.replace(/ /g, '_'), filename);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath); 
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export { createSubmission, createSubmissionController, checkPreviousSubmission, getSubmissionsForClass, viewSubmissionFile, downloadSubmissionFile };

