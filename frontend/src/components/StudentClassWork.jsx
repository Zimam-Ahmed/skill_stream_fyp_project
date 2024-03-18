import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';

function StudentClassWork({ classWorkData }) {

  const formattedDueDate = new Date(classWorkData.duedate).toLocaleDateString('en-US');

  return (
    <Link to={`/ClassWorkSubmission/${classWorkData._id}`} id='assignmentlink'>
      <div className="assign-card">
        <div className="card-header">
          <h2><FaFileAlt /> {classWorkData.title}</h2>
          <p>Due Date: {formattedDueDate}</p>
        </div>
      </div>
    </Link>
  );
}

export default StudentClassWork;
