import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InnerHeader from '../components/InnerHeader.jsx';
import JoinedClassCard from '../components/JoinedClassCard.jsx';

function StudentClassScreen() {
  const [joinedClasses, setJoinedClasses] = useState([]);

  useEffect(() => {
    // Make an API request to fetch the user's joined classes
    axios.get('/api/classroom/user-joined-classes')
      .then((response) => {
        setJoinedClasses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user joined classes:', error);
      });
  }, []);

  return (
    <>
      <InnerHeader />
      <div>
        <div className="classes">
          {joinedClasses.map((classroom) => (
            <JoinedClassCard key={classroom._id} classData={classroom} />
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentClassScreen;
