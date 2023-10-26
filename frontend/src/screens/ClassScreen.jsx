import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassCard from '../components/ClassCard';
import InnerHeader from '../components/InnerHeader.jsx';
import TeacherHeader from '../components/TeacherHeader.jsx';
import { useParams } from 'react-router-dom'; // Import useParams

function ClassScreen() {
  const { classId } = useParams(); // Get the class ID from the URL
  const [classroom, setUserClassroom] = useState([]);

  useEffect(() => {
    // Make an API request to fetch user's created classes
    axios.get('/api/classroom/user-classrooms')
      .then((response) => {
        setUserClassroom(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user classes:', error);
      });
  }, []);

  return (
    <>
      <InnerHeader />
      <div>
        <div className="class-cards">
          {classroom.map((classroom) => (
            <ClassCard key={classroom._id} classData={classroom} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ClassScreen;
