import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InnerHeader from '../components/InnerHeader.jsx';
import TeacherHeader from '../components/TeacherHeader.jsx';
import TeacherClass from '../components/TeacherClass.jsx';
import { useParams } from 'react-router-dom'; // Import useParams

function TeacherClassScreen() {
  const { classId } = useParams(); // Get the class ID from the URL
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    // Make an API request to fetch the selected class details by classId
    axios.get(`/api/classroom/${classId}`)
      .then((response) => {
        setSelectedClass(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class details:', error);
      });
  }, [classId]);

  return (
    <>
      <InnerHeader />
      <TeacherHeader />
      <div>
        {selectedClass ? (
          <TeacherClass classData={selectedClass} />
        ) : (
          <p>No class selected.</p>
        )}
      </div>
    </>
  );
}

export default TeacherClassScreen;
