// ViewSubmission.js
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
import { useParams } from 'react-router-dom';
import { useUpdateObtainedPointsMutation } from '../slices/submissionApiSlice';
import { setSubmissionInfo } from '../slices/authSlice';

function ViewSubmission() {
  const { classworkId, filename } = useParams();

  // Use an absolute URL for the file
  const fileURL = `/api/submission/view/${classworkId}/${filename}`;

  const [obtainedPoints, setObtainedPoints] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [updateObtainedPoints, { isLoading }] = useUpdateObtainedPointsMutation();
  
  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const decodedFilename = decodeURIComponent(filename);
      const res = await updateObtainedPoints({
        classworkId,
        filename: decodedFilename,
        obtainedPoints, // Use the correct term
      }).unwrap();
      
      dispatch(setSubmissionInfo({ ...res }));
      toast('Marks added');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <div>
      <div>
        <FormContainer>
          <h1>Upload Marks</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="obtainedPoints">
              <Form.Label>Obtained Marks</Form.Label>
              <Form.Control 
                type='number' 
                placeholder="Enter Marks" 
                value={obtainedPoints} 
                onChange={(e) => setObtainedPoints(e.target.value)}
              />
            </Form.Group>
            
            {isLoading && <Loader/>}
            <Button type="submit" variant="primary" className="mt-3" id='create'>
              Add
            </Button>
          </Form>
        </FormContainer>
      </div>
      <div>
        <iframe src={fileURL} title="Submission File" width="100%" height="600"/>
      </div>
    </div>
  ); 
}

export default ViewSubmission;
