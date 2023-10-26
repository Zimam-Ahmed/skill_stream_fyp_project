import React, { useState, useEffect } from 'react';
import TeacherHeader from '../components/TeacherHeader';
import InnerHeader from '../components/InnerHeader';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import { FormContainer } from '../components/FormContainer';
import Loader from '../components/Loader';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateClassWorkMutation } from '../slices/classWorkApiSlice';
import { setClassWorkInfo } from '../slices/authSlice';
import { useParams } from 'react-router-dom';
import TeacherClassWork from '../components/TeacherClassWork';
import axios from 'axios';

const ClassWorkScreen = () => {
  const { classId } = useParams(); 
  const [createModal, setCreateModal] = useState(false);
  const [classroom, setUserClassroom] = useState(null);

  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [type, setType] = useState('');
  const [points, setPoints] = useState('');
  const [duedate, setDuedate] = useState('');
  
  // Update: Added file state to handle file data
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [createClassWork, { isLoading }] = useCreateClassWorkMutation();

  const handleFileInputChange = (e) => {
    // Update: Store the selected file
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const [classwork, setUserClasswork] = useState([]);

  useEffect(() => {
    // Make an API request to fetch user's created classes
    axios.get(`/api/classwork/classworks/${classId}`)
      .then((response) => {
        setUserClasswork(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user classework:', error);
      });
  }, []);



  useEffect(() => {
    axios.get(`/api/classroom/${classId}`)
      .then((response) => {
        setUserClassroom(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      });
  }, [classId]);

  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      // Update: Use FormData to send text data and file together
      const formData = new FormData();
      formData.append('title', title);
      formData.append('discription', discription);
      formData.append('type', type);
      formData.append('points', points);
      formData.append('duedate', duedate);
      formData.append('classId', classId);
      formData.append('createdBy', userInfo);
      formData.append('file', file); // Append the file
      
      // Update: Use formData as the payload
      const res = await createClassWork(formData).unwrap();
      
      dispatch(setClassWorkInfo({ ...res }));
      navigate(`/classwork/${classId}`);
      toast("Classwork Assigned");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div>
      <InnerHeader/>
      <TeacherHeader classData={classroom} />
      <div id='classWork-formContainer'>
        <Modal 
          size='lg'
          isOpen={createModal}
          toggle={() => setCreateModal(!createModal)}
        >
          <ModalHeader
            toggle={() => setCreateModal(!createModal)}
          >
            Create Classwork
          </ModalHeader>
          <ModalBody>
            <FormContainer>
              <h1>Create Classwork</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder="Enter Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="from_mg"
                  />
                </Form.Group>
                <Form.Group controlId="discription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder="Enter Work Description" 
                    value={discription} 
                    onChange={(e) => setDiscription(e.target.value)}
                    className="from_mg"
                  />
                </Form.Group>
                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder="Enter Type Work" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="from_mg"
                  />
                </Form.Group>
                <Form.Group controlId="points">
                  <Form.Label>Points</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder="Enter Work Points" 
                    value={points} 
                    onChange={(e) => setPoints(e.target.value)}
                    className="from_mg"
                  />
                </Form.Group>
                <Form.Group controlId="duedate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder="Enter Work Due Date" 
                    value={duedate} 
                    onChange={(e) => setDuedate(e.target.value)}
                    className="from_mg"
                  />
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label>Upload File</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileInputChange}
                    className="from_mg"
                  />
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3" id='create'>
                  Create
                </Button>
              </Form>
            </FormContainer>
          </ModalBody>
        </Modal>
      </div>
      <Link onClick={() => setCreateModal(true)} className='workButton'>Create Class Work</Link>    
      
    <div id='submission_border'/>
      <div>
        <div className="class-cards">
          {classwork.map((classwork) => (
            <TeacherClassWork key={classwork._id} classWorkData={classwork} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassWorkScreen;
