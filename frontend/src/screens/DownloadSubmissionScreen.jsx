import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InnerHeader from '../components/InnerHeader.jsx';
import DownloadSubmission from '../components/downloadSubmission.jsx';
import { useParams } from 'react-router';

const DownloadSubmissionScreen = () => {
    const { classworkId } = useParams();
    const [selectedSubmission, setSelectedSubmission] = useState(null);
  
    const downloadFile = () => {
      axios.get(`/api/submission/download/${classworkId}`, { responseType: 'blob' })
        .then((response) => {
          // Create a blob URL and trigger a download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', selectedClasswork.classwork.file);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading classwork file:', error);
        });
    };

    
  useEffect(() => {
    axios.get(`/api/submission/${classworkId}`)
      .then((response) => {
        setSelectedSubmission(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Submission details:', error);
      });
  }, [classworkId]);


  return (
    <div>
        <InnerHeader/>
        <div>
        {selectedSubmission ? (
          <DownloadSubmission
            submissionData={selectedSubmission.classwork}
            downloadFile={downloadFile}
          />
        ) : (
          <p>No classwork selected.</p>
        )}
      </div>
    </div>
  )
}

export default DownloadSubmissionScreen