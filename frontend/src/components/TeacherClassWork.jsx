import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';

function TeacherClassWork({ classWorkData }) {
  return (
    <Link to={`/submission/${classWorkData._id}`} id='assignmentlink'>
      <div className="assign-card">
        <div className="card-header">
          <h2><FaFileAlt /> {classWorkData.title}</h2>
          <p>Due Data: {classWorkData.duedate}</p>
        </div>
      </div>
    </Link>
  );
}

export default TeacherClassWork;
