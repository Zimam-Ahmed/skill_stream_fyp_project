// Import the necessary packages
import mongoose from "mongoose";

// Define the classroom schema
const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true, // Ensures the code is unique
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],
  
  // You can add more fields as needed
});

// Create the Classroom model using the schema
const Classroom = mongoose.model('Classroom', classroomSchema);

// Export the Classroom model
export default Classroom;
