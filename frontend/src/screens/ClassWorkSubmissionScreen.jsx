import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InnerHeader from '../components/InnerHeader.jsx';
import ClassWorkSubmission from '../components/ClassWorkSubmission.jsx';
import { useParams } from 'react-router-dom';

function ClassWorkSubmissionScreen() {
  const { classworkId } = useParams();
  const [selectedClasswork, setSelectedClasswork] = useState(null);

  const downloadFile = () => {
    axios.get(`/api/classwork/download/${classworkId}`, { responseType: 'blob' })
      .then((response) => {
        // Create a blob URL and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', selectedClasswork.classwork.file); // Use the file name from your data
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading classwork file:', error);
      });
  };

  useEffect(() => {
    axios.get(`/api/classwork/${classworkId}`)
      .then((response) => {
        setSelectedClasswork(response.data);
      })
      .catch((error) => {
        console.error('Error fetching classwork details:', error);
      });
  }, [classworkId]);

  return (
    <>
      <InnerHeader />
      <div>
        {selectedClasswork ? (
          <ClassWorkSubmission
            classWorkData={selectedClasswork.classwork} // Access the classwork text data
            downloadFile={downloadFile}
          />
        ) : (
          <p>No classwork selected.</p>
        )}
      </div>
      
    </>
  );
}

export default ClassWorkSubmissionScreen;
