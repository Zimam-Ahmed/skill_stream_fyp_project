import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

const TeacherHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const { classId } = useParams();

  return (
    <header className="teacher-header">
      <nav>
        <ul className="teacher-nav">
          <li className="nav-item">
            <NavLink to={`/studentClassWork/${classId}`}  className="nav-link">
              Class Work
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/studentAttendance/${classId}`} className="nav-link">
              Attendance
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/stpeople/${classId}`} className="nav-link">
              Students
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/marks/${classId}`} className="nav-link">
              Marks
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TeacherHeader;
