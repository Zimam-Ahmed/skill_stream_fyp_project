import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function ClassCard({ classData }) {
  return (
    <Link to={`/teacherClass/${classData._id}`} className="class-card-link">
      <div className="class-card">
        <div className="card-header">
          <h2>{classData.name}</h2>
          <p>Class Created By: {classData.createdBy.name}</p>
        </div>
        <div className="card-image">
          {/* Add your background image here */}
          <p>Class Name: {classData.name}</p>
        </div>
        <div className="card-footer">
          <p>Subject Name: {classData.subject}</p>
        </div>
      </div>
    </Link>
  );
}

export default ClassCard;
