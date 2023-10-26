import React from 'react'

const DownloadSubmission = ({ submissionData, downloadFile }) => {
  return ( 
  <div className="classwork-card">
    <div className="classwork-file">
        <a
        href={`javascript:void(0)`}
        onClick={() => downloadFile(submissionData.file)}
        >
        Download File: {downloadFile.file}
        </a>
    </div>
</div>
  )
}

export default DownloadSubmission;