import React from 'react';
import { useParams } from 'react-router-dom';
function ViewSubmission() {
  const { classworkId, filename } = useParams();

  // Use an absolute URL for the file
  const fileURL = `/api/submission/view/${classworkId}/${filename}`;

  return (
    <div>
      <h1>View Submission</h1>
      <iframe src={fileURL} title="Submission File" width="100%" height="600"></iframe>
      
    </div>
  ); 
}

export default ViewSubmission;
