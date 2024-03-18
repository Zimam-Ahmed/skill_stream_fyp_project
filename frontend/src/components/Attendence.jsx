import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserGraduate } from 'react-icons/fa';
import { useCreateAttendenceMutation } from '../slices/attendenceApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import { setAttendenceInfo } from '../slices/authSlice';

const Attendance = ({ students }) => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const { classId } = useParams();
  const dispatch = useDispatch();
  const [createAttendence, { isLoading }] = useCreateAttendenceMutation();

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.post('/api/classroom/students-by-ids', { studentIds: students });
      const initialAttendance = response.data.map(student => ({
        status: [
          {
            student: {
              email: student.email,
            },
            status: 'Absent',
          },
        ],
      }));
      setAttendanceData(initialAttendance);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      toast.error(error?.response?.data?.message || 'Error fetching student details');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudentDetails();
    };

    if (students.length > 0) {
      fetchData();
    }
  }, [students]);

  const handleAttendanceChange = (studentEmail, selectedStatus) => {
    setAttendanceData(prevData =>
      prevData.map(item => {
        if (item.status[0].student && item.status[0].student.email === studentEmail) {
          return { ...item, status: [{ student: { email: studentEmail }, status: selectedStatus }] };
        } else {
          return item;
        }
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Remove the wrapping array from status
      const formattedAttendanceData = attendanceData.map(item => ({
        email: item.status[0].student.email,
        status: item.status[0].status,
      }));

      const res = await createAttendence({ classId: classId, attendanceData: formattedAttendanceData }).unwrap();
      dispatch(setAttendenceInfo({ ...res }));

      toast("Attendance submitted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <div className="attendance-container">
      <h2 className="section-heading">
        <FaUserGraduate /> Attendance
      </h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Students</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {studentDetails.length > 0 ? (
            studentDetails.map((student, index) => (
              <tr key={index}>
                <td>{student.email}</td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-group-${index}`}
                    value="present"
                    onChange={() => handleAttendanceChange(student.email, 'Present')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-group-${index}`}
                    value="absent"
                    onChange={() => handleAttendanceChange(student.email, 'Absent')}
                    defaultChecked
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No students joined this class.</td>
            </tr>
          )}
        </tbody>
      </table>
      {isLoading && <Loader />}
      <button className="submit-button" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default Attendance;
