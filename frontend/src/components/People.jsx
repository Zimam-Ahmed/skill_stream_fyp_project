import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserTie, FaUserGraduate, FaExclamationCircle } from 'react-icons/fa'; // Import Font Awesome icons

const People = ({ createdBy, students }) => {
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
    <div className="people-container">
      <div className="teacher-section">
        <h2 className="section-heading">
          <FaUserTie /> Teacher
        </h2>
        <p className="created-by">{createdBy}</p>
      </div>

      <div className="student-section">
        <h2 className="section-heading">
          <FaUserGraduate /> Students
        </h2> 
        <ul className="student-list">
          {studentDetails.length > 0 ? (
            studentDetails.map((student, index) => (
              <li key={index} className="student-email">
                {student.email} {/* Display the student name */}
              </li>
            ))
          ) : (
            <div className="error-message">
            <FaExclamationCircle className="error-icon" />
            <p>Oops! It seems no one joined this class yet.</p>
          </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default People;
