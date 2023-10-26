import mongoose from 'mongoose';

const ClassworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String, 
    required: true,
  },
  type: {
    type: String, // 'assignment' or 'quiz'
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  duedate: {
      type: Date,
      required: false,
  },
  file: {
    type: String, // Store the filename// Store the GridFS file ID
    required: true,
  },
},
{
    timestamps: true
});

const Classwork = mongoose.model('Classwork', ClassworkSchema);

export default Classwork;
