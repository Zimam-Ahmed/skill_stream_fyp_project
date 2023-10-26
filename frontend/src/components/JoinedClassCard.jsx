import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

function JoinedClassCard({ classData }) {
  const navigate = useNavigate();

  // Function to handle card click and navigate to another page
  const handleCardClick = () => {
   
    // Replace '/your-desired-path' with the actual path you want to navigate to
    navigate(`/studentClassView/${classData._id}`);
  };

  return (
    <div className="class-card" onClick={handleCardClick}>
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
  );
}

export default JoinedClassCard;
