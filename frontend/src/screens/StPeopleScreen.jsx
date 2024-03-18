import React, { useEffect, useState } from 'react';
import InnerHeader from '../components/InnerHeader';
import StudentHeader from '../components/StudentHeader';
import StPeople from '../components/StPeople';
import { useParams } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

const StPeopleScreen = () => {
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
      <StudentHeader/>
      <div>
        {selectedClass ? (
          <StPeople
            createdBy={selectedClass.createdBy.name}
            students={selectedClass.students}
          />
        ) : (
            <div className="error-message">
            <FaExclamationCircle className="error-icon" />
            <p>Oops! It seems you haven't joined any class yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default StPeopleScreen;
