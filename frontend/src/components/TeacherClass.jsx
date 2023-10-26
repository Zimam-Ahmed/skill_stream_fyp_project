import React from 'react';

const TeacherClass = ({ classData }) => {
  return (
    <div className="teacher-class-screen">
      <div className="class-info">
        <div className="class-name">
          <h1>{classData.subject}</h1>
        </div>
      </div>
      <div id='class-code-stream'>
        <div className="class-details">
          <h4>Class Code</h4>
          <div className="code-box">
            <p id='classCode'>{classData.code}</p>
          </div>
        </div>
        <div className="live-stream">
          <h2>Create Live Stream Now</h2>
          <button className="start-button">Start Now</button>
        </div>
      </div>
    </div>
  );
}

export default TeacherClass;
