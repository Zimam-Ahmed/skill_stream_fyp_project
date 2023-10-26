import asyncHandler from 'express-async-handler';
import Attendance from '../models/attendenceModel.js';
// @desc Create or update attendance for a student in a specific class
// @route POST /api/attendance/:classId
// @access Private (only authenticated users can create/update attendance)
const createOrUpdateAttendance = asyncHandler(async (req, res) => {
  const { studentId, date, status } = req.body;
  const teacherId = req.user._id;
  const classId = req.params.classId; // Extract classId from route params

  let attendance = await Attendance.findOne({ student: studentId, date, class: classId });

  if (attendance) {
    attendance.status = status;
  } else {
    attendance = new Attendance({ 
      student: studentId,
      teacher: teacherId,
      class: classId, // Associate the attendance record with the class
      date,
      status,
    });
  }

  await attendance.save();

  res.status(201).json({ message: 'Attendance updated successfully' });
});



export { createOrUpdateAttendance };
