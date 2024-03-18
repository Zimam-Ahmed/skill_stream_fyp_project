import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  classworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classwork', 
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  obtainedPoints: {
    type: Number,
  },
  file: {
    type: String, 
    required: true,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
