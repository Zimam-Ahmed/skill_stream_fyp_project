import asyncHandler from 'express-async-handler';
import Classroom from '../models/classModel.js';
import User from '../models/userModel.js';


// Function to generate a random 5-digit code
function generateRandomCode() {
  const min = 10000; // Minimum 5-digit number
  const max = 99999; // Maximum 5-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// @desc user class creation
// route POST /api/classroom
// @access public
const createClass = asyncHandler(async (req, res) => {
  const { name, subject } = req.body;
  // Generate a random 5-digit code
  const code = generateRandomCode();  

  const classroom = await Classroom.create({
    name,
    subject,
    code,
    createdBy: req.body.createdBy._id,
  });
  
  if (classroom) {
    // Your code here for any additional actions
    res.status(201).json({
      _id: classroom._id,
      name: classroom.name,
      subject: classroom.subject,
      code: classroom.code,
      createdBy: classroom.createdBy,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getAllClassrooms = asyncHandler(async (req, res) => {
  // Fetch all classrooms
  const classrooms = await Classroom.find().populate('createdBy', 'name');;

  if (classrooms) {
    res.json(classrooms);
  } else {
    res.status(404);
    throw new Error('Classrooms not found');
  }
});


const getUserClassrooms = asyncHandler(async (req, res) => {
  // Get the user's ID from the authenticated user
  const userId = req.user._id; // Assuming you store user information in req.user

  // Fetch classrooms created by the user
  const classrooms = await Classroom.find({ createdBy: userId }).populate('createdBy', 'name');

  if (classrooms) {
    res.json(classrooms);
  } else {
    res.status(404);
    throw new Error('User classrooms not found');
  }
});


// @desc Join a class
// @route POST /api/classroom/join
// @access Private (only authenticated users can join classes)
const joinClass = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const userId = req.user._id; // Get the user's ID from the authenticated request

  // Check if a classroom with the given code exists
  const classroom = await Classroom.findOne({ code });

  if (!classroom) {
    res.status(404);
    throw new Error('Class not found with the provided code');
  }

  // Check if the user is already a student in this class
  if (classroom.students.includes(userId)) {
    res.status(400);
    throw new Error('You are already a student in this class');
  }

  // Add the user to the classroom's students array
  classroom.students.push(userId);
  await classroom.save();

  // Respond with a success message or relevant data
  res.status(200).json({ message: 'Successfully joined the class' });
});


const getUserJoinedClasses = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user's ID from the authenticated request
  // Fetch the classes where the user's ID is in the students array
  const joinedClasses = await Classroom.find({ students: userId }).populate('createdBy', 'name');

  if (joinedClasses) {
    res.json(joinedClasses);
  } else {
    res.status(404);
    throw new Error('Joined classes not found');
  }
});



// @desc Get class details for a student
// @route POST /api/classroom/student-class-details
// @access Private (only authenticated users can view class details)
const getStudentClassDetails = asyncHandler(async (req, res) => {
  const { classId } = req.body; // Get the classId from the request body
  const userId = req.user._id; // Get the user's ID from the authenticated request

  // Check if the user is a student in the specified class
  const classroom = await Classroom.findOne({ _id: classId, students: userId }).populate('createdBy', 'name');

  if (!classroom) {
    res.status(404);
    throw new Error('Class not found or user is not a student in this class');
  }

  // Respond with the class details
  res.json(classroom);
});

// @desc Get class details by ID
// @route GET /api/classroom/:id
// @access Private (only authenticated users can view class details)
const getClassDetailsById = asyncHandler(async (req, res) => {
  const classId = req.params.id; // Get the classId from the URL parameter

  // Fetch the class details by ID
  const classroom = await Classroom.findById(classId).populate('createdBy', 'name');

  if (!classroom) {
    res.status(404);
    throw new Error('Class not found');
  }

  // Respond with the class details
  res.json(classroom);
});


const getStudentsByIds = asyncHandler(async (req, res) => {
  try {
    // Get the array of student IDs from the request (you can adjust this as needed)
    const { studentIds } = req.body;

    // Fetch user details for the given student IDs
    const students = await User.find({ _id: { $in: studentIds } });

    if (students) {
      // Respond with the array of student details
      res.json(students);
    } else {
      res.status(404);
      throw new Error('Students not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const createOrUpdateLink = asyncHandler(async (req, res) => {
  const classId = req.params.classId; // Get the classId from the URL parameter
  const { link } = req.body;
  try {
    // Fetch the class by ID
    const classroom = await Classroom.findById(classId);

    if (!classroom) {
      res.status(404);
      throw new Error('Class not found');
    }

    // Update or create the link
    classroom.link = link;
    await classroom.save();

    res.status(200).json({ message: 'Link updated or created successfully', link: classroom.link });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export { createClass, getAllClassrooms, getUserClassrooms, joinClass, getUserJoinedClasses, getStudentClassDetails, getClassDetailsById, getStudentsByIds, createOrUpdateLink };
