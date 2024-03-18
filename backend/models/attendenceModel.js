import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: [
    {
      student: {
        email: {
          type: String,
          required: true,
        },
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Absent',
      },
    },
  ],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
