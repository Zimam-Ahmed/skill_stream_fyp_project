import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import { FormContainer } from '../components/FormContainer';
import Loader from '../components/Loader';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateSubmissionMutation } from '../slices/submissionApiSlice';
import { setSubmissionInfo } from '../slices/authSlice';
import { useParams } from 'react-router-dom';

const ClassWorkSubmission = ({ classWorkData, downloadFile }) => {

  const { classworkId } = useParams();
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Add this state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [createSubmission, { isLoading }] = useCreateSubmissionMutation();

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('classworkId', classworkId);
      formData.append('file', file);

      const res = await createSubmission(formData).unwrap();
      dispatch(setSubmissionInfo({ ...res }));
      setIsFileUploaded(true); // Set isFileUploaded to true
      navigate(`/ClassWorkSubmission/${classworkId}`);
      toast("Work Submitted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const formattedDueDate = new Date(classWorkData.duedate).toLocaleDateString('en-US');
  return (
    <div className="class-work-screen">
      <div className="classwork-card">
        <div className="classwork-info">
          <h2>Title: {classWorkData.title}</h2>
          <p>Type: {classWorkData.type}</p>
          <p>Description: {classWorkData.discription}</p>
          <p>Points: {classWorkData.points}</p>
          <p>Due Date: {formattedDueDate}</p>
        </div>

        <div className="classwork-file">
          <a
            href={`javascript:void(0)`}
            onClick={() => downloadFile(classWorkData.file)}
            id='dowloadButton'
          >
            Download File: {classWorkData.file}
          </a>
        </div>
      </div>

      
        
        <FormContainer>
        <h3>Submit Your Classwork</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="file">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={handleFileInputChange}
                className="from_mg"
                disabled={isFileUploaded} // Disable the file input when a file is uploaded
              />
            </Form.Group>
            {isLoading && <Loader />}
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              id="create"
              disabled={isFileUploaded}
            >
              Submit
            </Button>
          </Form>
        </FormContainer>
      
    </div>
  );
}

export default ClassWorkSubmission;
