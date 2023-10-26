import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserGraduate } from 'react-icons/fa'; // Import Font Awesome icons

const Attendance = ({ students }) => {


const [studentDetails, setStudentDetails] = useState([]);

  useEffect(() => {
    // Fetch student details based on their IDs
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.post('/api/classroom/students-by-ids', { studentIds: students });
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    if (students.length > 0) {
      fetchStudentDetails();
    }
  }, [students]);
  

  return (
    <div className="attendance-container">
      <div className="student-section">
        <h2 className="section-heading">
          <FaUserGraduate /> Students
        </h2>
        <ul className="student-list">
          {studentDetails.length > 0 ? (
            studentDetails.map((students, index) => (
              <li key={index} className="student-email">
                {students.email} {/* Display the student name */}
              </li>
            ))
          ) : (
            <p>No students joined this class.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
