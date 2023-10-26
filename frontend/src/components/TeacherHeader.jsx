import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

const TeacherHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const { classId } = useParams(); // Get classId from the URL parameters

  return (
    <header className="teacher-header">
      <nav>
        <ul className="teacher-nav">
          <li className="nav-item">
            <NavLink to="/class" className="nav-link">
              Classes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/classwork/${classId}`} className="nav-link">
              Class Work
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/people/${classId}`} className="nav-link">
              Students
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/attendence/${classId}`}  className="nav-link">
              Attendance
            </NavLink>
          </li>
         
        </ul>
      </nav>
    </header>
  );
};

export default TeacherHeader;
