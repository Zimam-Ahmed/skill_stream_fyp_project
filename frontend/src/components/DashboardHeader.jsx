import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <header className="teacher-header" id='Dashead'>
      <nav>
        <ul className="teacher-nav">
          <li className="nav-item">
            <NavLink to="/studentClasses" className="nav-link">
              My Enrolled Classes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/class" className="nav-link">
              My Classes
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
