import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentHeader from './StudentHeader.jsx';
import InnerHeader from './InnerHeader.jsx';
import { useParams } from 'react-router-dom';

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { classId } = useParams();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`/api/attendence/attendance/${classId}`);
        console.log(response);

        // Check if the response structure is as expected
        if (response.data && response.data.attendanceData) {
          setAttendanceData(response.data.attendanceData);
        } else {
          console.error('Unexpected response format:', response.data);
          // Handle unexpected response format, show an error message, etc.
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);

        // Handle the error, show an error message, retry logic, etc.
      }
    };

    fetchAttendanceData();
  }, [classId]); // Include classId in the dependency array to fetch data when it changes
  
  
  function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  
  const presentCount = attendanceData.filter(data => data.status[0].status === 'Present').length;
  const absentCount = attendanceData.filter(data => data.status[0].status === 'Absent').length;
  const totalCount = attendanceData.length;

  const presentPercentage = ((presentCount / totalCount) * 100).toFixed(2);
  const absentPercentage = ((absentCount / totalCount) * 100).toFixed(2);

  return (
    <>
      <StudentHeader />
      <InnerHeader />
      <div className="attendance-container">
        <h2>My Attendance</h2>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((data, index) => (
                <tr key={index}>
                  <td>{formatDate(data.date)}</td>
                <td>{data.status[0].status === 'Present' ? '✔' : ''}</td>
                <td>{data.status[0].status === 'Absent' ? '✘' : ''}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="summary">
          <p>Total Present: {presentCount}</p>
          <p>Total Absent: {absentCount}</p>
          <p>Present Percentage: {presentPercentage}%</p>
          <p>Absent Percentage: {absentPercentage}%</p>
        </div>
      </div>
    </>
  );
};

export default StudentAttendance;
