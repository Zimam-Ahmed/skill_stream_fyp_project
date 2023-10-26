import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InnerHeader from '../components/InnerHeader.jsx';
import StudentHeader from '../components/StudentHeader.jsx';
import StudentClassView from '../components/StudentClassView.jsx';
import { useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters

function StudentClassViewScreen() {
  const { classId } = useParams(); // Access the classId from URL parameters
  const [selectedClass, setSelectedClass] = useState([]);

  useEffect(() => {
    // Make an API request to fetch the selected class by its ID
    axios.get(`/api/classroom/${classId}`)
      .then((response) => {
        setSelectedClass(response.data);
      })
      .catch((error) => {
        console.error('Error fetching selected class:', error);
      });
  }, [classId]);

  return (
    <>
      <InnerHeader />
      <StudentHeader />
      <div>
        {selectedClass ? (
          <StudentClassView classData={selectedClass} />
        ) : (
          <p>No class selected.</p>
        )}
      </div>
    </>
  );
}

export default StudentClassViewScreen;
