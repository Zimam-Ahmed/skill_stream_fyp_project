import Classwork from '../models/classWorkModel.js';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import moment from 'moment';  

// Define __dirname using import.meta
const importMetaUrl = new URL(import.meta.url);
const __dirname = path.dirname(importMetaUrl.pathname);

// / Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a folder for each classwork
    const folder = path.join('public', 'uploads', req.body.title.replace(/ /g, '_'));
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    // Use the original file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware to handle file upload
const createClassWork = upload.single('file');

// Controller function to create classwork
const createClassWorkController = asyncHandler(async (req, res) => {
  try {
    if (req.file) {
      const { title, discription, type, points, duedate, classId } = req.body;
       // Assuming the classId is in the route params
      const createdBy = req.user._id;

      const parsedDueDate = moment(duedate, 'DD/MM/YYYY').toDate();
      
      const classwork = await Classwork.create({
        title,
        discription,
        type,
        points,
        classId,
        createdBy,
        duedate: parsedDueDate,
        file: req.file.filename,
      });

      res.status(201).json({
        _id: classwork._id,
        title: classwork.title,
        discription: classwork.discription,
        type: classwork.type,
        points: classwork.points,
        classId: classwork.classId,
        createdBy: classwork.createdBy,
        duedate: classwork.duedate,
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

// Controller function to get classwork data by class ID
const getClassworksByClassId = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  const classwork = await Classwork.find({ classId });
  
  if (classwork) {
    res.status(200).json(classwork);
  } else {
    res.status(404);
    throw new Error('Classworks not found');
  }
});

const getClassWorkDetailsById = asyncHandler(async (req, res) => {
  const { classworkId } = req.params; // Get the classwork ID from the URL parameter
  
  try {
    // Fetch the classwork details by ID
    const classwork = await Classwork.findById(classworkId);

    if (!classwork) {
      return res.status(404).json({ message: 'Classwork not found' });
    }

    // Construct the path to the file
    const filePath = path.join('public', 'uploads', classwork.title.replace(/ /g, '_'), classwork.file);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Send the classwork data along with the file path for download
      res.json({ classwork, filePath });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Add this function at the bottom of your classWorkController.js
const downloadClassworkFile = asyncHandler(async (req, res) => {
  const { classworkId } = req.params; // Get the classwork ID from the URL parameter

  try {
    // Fetch the classwork details by ID
    const classwork = await Classwork.findById(classworkId);

    if (!classwork) {
      return res.status(404).json({ message: 'Classwork not found' });
    }

    // Construct the path to the file
    const filePath = path.join('public', 'uploads', classwork.title.replace(/ /g, '_'), classwork.file);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate headers for file download
      res.setHeader('Content-Disposition', `attachment; filename=${classwork.file}`);
      res.setHeader('Content-Type', 'application/octet-stream');

      // Stream the file as the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export {
  createClassWork,
  getClassworksByClassId,
  createClassWorkController,
  getClassWorkDetailsById,
  downloadClassworkFile,
};
