import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrUpdateLinkMutation } from "../slices/classApiSlice";
import { useParams } from 'react-router-dom';

const TeacherClass = ({ classData }) => {
  const { classId } = useParams();
  const [link, setLink] = useState('');

  const dispatch = useDispatch();

  const [createOrUpdateLink, { isLoading }] = useCreateOrUpdateLinkMutation();
  
  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log('classId:', String(classId));
    console.log('link:', link);
      try {
        const res = await createOrUpdateLink({ classId: classId, link: link }).unwrap();
        dispatch(setClassInfo({ ...res }));
        
        toast.error ("Link sended Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }

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
        <h2>Start Video Call Now</h2>
        <Link to={'http://localhost:9000/create'} className="start-button" target="_blank" rel="noopener noreferrer">
          Start Now
        </Link>
      </div>
      </div>
      
      <div className="live-stream-link">
      <h2>Enter Attendees link to Join Stream</h2>
      <form>
      <input
            type='text'
            value={link}
            id='link-input'
            onChange={ (e) => setLink(e.target.value) }
          />
          {isLoading && <Loader/>}
        <button className='start-button' onClick={ submitHandler }>Send</button>
      </form>
        </div>
    </div>
  );
}

export default TeacherClass;
