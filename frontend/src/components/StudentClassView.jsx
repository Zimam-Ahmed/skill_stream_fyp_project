import React from 'react';

const StudentClassView = ({ classData }) => {
  return (
    <div className="teacher-class-screen">
      <div className="class-info">
        <div className="class-name">
          <h1>{classData.subject}</h1>
        </div>
      </div>
      <div id='class-code-stream'>
      <button className="class-details">
          <h4>Class Work</h4>
          <button className="code-box" id='classCode'>
            Assigned
          </button>
        </button>
        <div className="live-stream">
          <h2>Join Live Stream Now</h2>
          <button className="start-button">join Now</button>
        </div>
      </div>
     
    </div>
  );
}

export default StudentClassView;
