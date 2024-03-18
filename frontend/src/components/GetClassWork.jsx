import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';

const GetClassWork = ({ classWorkData, classworkId }) => {
  const formattedDueDate = new Date(classWorkData.submissionDate).toLocaleDateString('en-US');
  return (
    <Link to={`/view-submission/${classworkId}/${classWorkData.file}`} id='assignmentlink'>
    <div className="assign-card">
      <div className="card-header">
        <h2><FaFileAlt /> {classWorkData.studentId.name}</h2>
        <p>Submission Data: {formattedDueDate}</p>
      </div> 
    </div>
  </Link>
  )
}

export default GetClassWork;  