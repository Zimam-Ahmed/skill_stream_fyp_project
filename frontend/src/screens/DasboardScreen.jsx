import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import { FormContainer } from '../components/FormContainer';
import Loader from '../components/Loader';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React from 'react';
import { useCreateClassMutation } from "../slices/classApiSlice";
import { useJoinClassMutation } from "../slices/classApiSlice"
import { setClassInfo } from '../slices/authSlice';
import DashboardHeader from '../components/DashboardHeader';




function Dashboard() {
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const [code, setCode] = useState(''); // Add code state for class joining

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classInfo } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
 
  const [createClass, { isLoading }] = useCreateClassMutation();
  const [joinClass, { isLoading: joinLoading }] = useJoinClassMutation();

  const [isFormButtonDisabled, setFormButtonDisabled] = useState(false);
 
  
  const submitHandler = async (e) =>{
    e.preventDefault();
   
      try {
        const res = await createClass({ name, subject, createdBy: userInfo }).unwrap();
        dispatch(setClassInfo({ ...res }));
        navigate('/class');
        toast("Class Created Successfully");
        setFormButtonDisabled(true);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }
  const joinClassHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await joinClass({ code, user: userInfo }).unwrap(); // Use joinClass mutation
      dispatch(setClassInfo({ ...res }));
      navigate('/studentClasses');
      toast("Class Joined Successfully");
      setFormButtonDisabled(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
        <Modal 
          size='lg'
          isOpen={createModal}
          toggle={()=>setCreateModal(!createModal)}
        >
          <ModalHeader
          toggle={()=>setCreateModal(!createModal)}
          >
            Create class
          </ModalHeader>
          <ModalBody>
          <FormContainer>
            <h1>Create Class</h1>
              <Form onSubmit={ submitHandler }>
                  <Form.Group  controlId="name">
                      <Form.Label>Class Name</Form.Label>
                      <Form.Control 
                      type='text' 
                      placeholder="Enter Class Name" 
                      value={ name } 
                      onChange={ (e) => setName(e.target.value) }
                      >
                  </Form.Control>
                </Form.Group>
                <Form.Group  controlId="subject">
                  <Form.Label>Subject Name</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder="Enter Subject Name" 
                    value={ subject } 
                    onChange={ (e) => setSubject(e.target.value) }
                    >
                  </Form.Control>
                </Form.Group>
                
                
                {isLoading && <Loader/>}
                <Button type="submit" variant="primary" className="mt-3" id='create' disabled={isFormButtonDisabled}>
                  Create
                </Button>
                
              </Form>
            
          </FormContainer>
          </ModalBody>
        </Modal>




        <Modal 
          size='lg'
          isOpen={joinModal}
          toggle={()=>setJoinModal(!joinModal)}
        >
          <ModalHeader
          toggle={()=>setJoinModal(!joinModal)}
          >
            Join class
          </ModalHeader>
          <ModalBody>
          <FormContainer>
            <h1>Join Class</h1>
              <Form onSubmit={ joinClassHandler }>
                  <Form.Group  controlId="code">
                      <Form.Label>Join by Code</Form.Label>
                      <Form.Control 
                      type='text' 
                      placeholder="Enter Class  Code" 
                      value={ code } 
                      onChange={ (e) => setCode(e.target.value) }
                      >
                  </Form.Control>
                </Form.Group>
                
                {joinLoading && <Loader/>}
                <Button type="submit" variant="primary" className="mt-3" id='create' disabled={isFormButtonDisabled}>
                  JOIN
                </Button>
                
              </Form>
            
          </FormContainer>
          </ModalBody>
        </Modal>
    <DashboardHeader/>

    <div id='dashHeading'>
    <h1>Welcome to <span id='halfLogo'>Skill</span><span id='sHalfLogo'> Stream</span></h1>
    </div>
    <div id='dashText'><h3>Learn collaborate and Visualize<br></br>Sorting and Path-finding algorithms</h3></div>
    <div className="dashboard-container" id='dashContainer'>
      <div className="card">
      <div className="cardimg"></div>
        <h2>Create or Join a Class</h2>
        <p>Create a new classroom or join an existing one.</p>
        <Link onClick={() => setCreateModal(true)}>Create</Link>
        <br></br>
        <Link onClick={() => setJoinModal(true)}>Join</Link>
      </div>
      <div className="card">
        <h2>Pathfinder Visualizer</h2>
        <p>Visualize pathfinding algorithms like Dijkstra's.</p>
        <Link to="/path-finder">Start Now</Link>
      </div>
      <div className="card">
        <h2>Sorting Algorithm</h2>
        <p>Visualize sorting algorithms like bubble sort and quick sort.</p>
        <Link to="/sortvisualize">Start Now</Link>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
