import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentClassWork from '../components/StudentClassWork.jsx';
import InnerHeader from '../components/InnerHeader.jsx';
import StudentHeader from '../components/StudentHeader.jsx';
import { useParams } from 'react-router-dom'; // Import useParams

function StudentClassWorkScreen() {
  const { classId } = useParams(); // Get the class ID from the URL
  const [classwork, setUserClasswork] = useState([]);

  useEffect(() => {
    // Make an API request to fetch user's created classes
    axios.get(`/api/classwork/classworks/${classId}`)
      .then((response) => {
        setUserClasswork(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user classework:', error);
      });
  }, []);

  return (
    <>
      <InnerHeader />
      <StudentHeader/>
      <div>
        <div className="class-cards">
          {classwork.map((classwork) => (
            <StudentClassWork key={classwork._id} classWorkData={classwork} />
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentClassWorkScreen;
