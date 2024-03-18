import asyncHandler from 'express-async-handler';
import Attendance from '../models/attendenceModel.js';

const createOrUpdateAttendance = asyncHandler(async (req, res) => {
  const { classId, attendanceData } = req.body;
  const teacherId = req.user._id;
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    for (const { email, status } of attendanceData) {
      const existingAttendance = await Attendance.findOne({
        'status.student.email': email,
        classId,
        date: currentDate,
      });

      if (existingAttendance) {
        // Update the existing attendance record
        await Attendance.updateOne(
          {
            'status.student.email': email,
            classId,
            date: currentDate,
          },
          {
            $set: { 'status.$.status': status },
          }
        );
      } else {
        // Create a new attendance record for the current date
        const attendance = new Attendance({
          classId,
          teacher: teacherId,
          date: currentDate,
          status: [{ student: { email }, status }],
        });
        await attendance.save();
      }
    }

    res.status(201).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const getAttendanceByClassAndUser = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;
    const studentEmail = req.user.email; // Assuming email is unique to each student

    // Retrieve attendance data based on classId and studentEmail
    const attendanceData = await Attendance.find({
      classId,
      'status.student.email': studentEmail,
    });

    res.status(200).json({ attendanceData });
  } catch (error) {
    console.error('Error getting attendance data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { createOrUpdateAttendance, getAttendanceByClassAndUser };
