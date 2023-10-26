import React, { useEffect, useState } from 'react';
import InnerHeader from '../components/InnerHeader';
import TeacherHeader from '../components/TeacherHeader';
import People from '../components/People';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PeopleScreen = () => {
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
          <People
            createdBy={selectedClass.createdBy.name}
            students={selectedClass.students}
          />
        ) : (
          <p>No Student Joined Class.</p>
        )}
      </div>
    </>
  );
};

export default PeopleScreen;
