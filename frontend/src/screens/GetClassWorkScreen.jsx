import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InnerHeader from '../components/InnerHeader.jsx';
import { useParams } from 'react-router-dom'; // Import useParams
import GetClassWork from '../components/GetClassWork.jsx';

function GetClassWorkScreen() {
  const { classworkId } = useParams(); // Get the class ID from the URL
  const [submission, setUserSubmission] = useState([]);

  useEffect(() => {
    // Make an API request to fetch user's created classes
    axios.get(`/api/submission/${classworkId}`)
      .then((response) => {
        setUserSubmission(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user class submission work:', error);
      });
  }, []);

  return (
    <>
    <InnerHeader/>
    <div>
        <div className="class-cards">
          {submission.length === 0 ? (
            <p>No submission Yet</p>
          ) : (
            submission.map((submission) => (
              <GetClassWork key={submission._id} classWorkData={submission} classworkId={classworkId} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default GetClassWorkScreen;
