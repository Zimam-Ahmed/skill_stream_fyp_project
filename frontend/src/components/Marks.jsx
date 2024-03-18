import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Marks() {
    const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Make an API request to fetch user's submissions
    axios.get('/api/submission/submission/user')
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching submissions:', error);
      });
  }, []);
  
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    }
    
  return (
    <div id='marksContainer'>
    <h2>Marks Summary</h2>
    <table className="marks-table">
      <thead>
        <tr>
          <th>Classwork Name</th>
          <th>Submission Date</th>
          <th>Obtained Marks</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
          <tr key={submission._id}>
            <td>{submission.classworkId && submission.classworkId.title}</td>
            <td>{formatDate(submission.submissionDate)}</td>
            <td>{submission.obtainedPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
  };

export default Marks;
