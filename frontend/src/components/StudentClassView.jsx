import React from 'react';
import { useParams } from 'react-router';

const StudentClassView = ({ classData }) => {
  const { classId } = useParams();
  return (
    <div className="teacher-class-screen">
      <div className="class-info">
        <div className="class-name">
          <h1>{classData.subject}</h1>
        </div>
      </div>
      <div id='class-code-stream'>
        <a href={`/studentClassWork/${classId}`} className="class-details">
      
          <h4>Class Work</h4>
          <button className="code-box" id='classCode'>
            Assigned
          
        </button>
        </a>
        <div className="live-stream">
          <h2>Join Live Stream Now</h2>
          <button onClick={() => window.open(classData.link, '_blank')} className="start-button">
            Join
          </button>
  </div>
      </div>
     
    </div>
  );
}

export default StudentClassView;
