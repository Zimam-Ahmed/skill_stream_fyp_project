import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom.students',
    },
  ],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom.createdBy',
    required: true,
  },
  status: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom.students',
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present',
      },
    },
  ],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
