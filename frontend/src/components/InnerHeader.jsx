import React, { useState, useEffect } from 'react';
import {
    FaHome,
    FaChalkboardTeacher,
    FaUsers,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const InnerHeader = ({ children }) => {
    const [userCreatedClasses, setUserCreatedClasses] = useState([]);
    const [userJoinedClasses, setUserJoinedClasses] = useState([]);

    // Fetch user-created classes
    useEffect(() => {
        axios.get('/api/classroom/user-classrooms')
            .then((response) => {
                setUserCreatedClasses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user-created classes:', error);
            });
    }, []);

    // Fetch user-joined classes
    useEffect(() => {
        axios.get('/api/classroom/user-joined-classes')
            .then((response) => {
                setUserJoinedClasses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user-joined classes:', error);
            });
    }, []);

    return (
        <div id="innerHeaderContainer">
            <div className="sidebar">
                <NavLink to="/dashboard" className="home-link">
                    <FaHome />
                    <span>Home</span>
                </NavLink>

                <div className="category-heading">Teaching</div>
                <div className="sublinks scrollable">
                    {userCreatedClasses.map((item, index) => (
                        <NavLink to={`/teacherClass/${item._id}`} key={index} className="class-link">
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>
                <div className="category-heading">Enrolled</div>
                <div className="sublinks scrollable">
                    {userJoinedClasses.map((item, index) => (
                        <NavLink to={`/studentClassView/${item._id}`} key={index} className="class-link">
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default InnerHeader;
