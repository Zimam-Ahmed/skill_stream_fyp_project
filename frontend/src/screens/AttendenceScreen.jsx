import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InnerHeader from '../components/InnerHeader';
import TeacherHeader from '../components/TeacherHeader';
import Attendence from '../components/Attendence.jsx';
import axios from 'axios';

const AttendenceScreen = () => {
  const { classId } = useParams();
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`/api/classroom/${classId}`);
        setSelectedClass(response.data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);


  return (
    <>
      <InnerHeader />
      <TeacherHeader />
      <div>
        {selectedClass ? (
          <Attendence
            students={selectedClass.students}
          />
        ) : (
          <p>No Student Joined Class.</p>
        )}
      </div>
    </>
  );
};

export default AttendenceScreen;
