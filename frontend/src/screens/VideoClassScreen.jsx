import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "../VideoComponents/VideoCall.jsx";

function VideoClassScreen() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App" id="videoCamera">
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (

        <div id="videoContainer">
            <div id='videoSection'>
              <div id='blogOne'>
                  <h1>Learn on your schedule from any device</h1>
                  <p>No need to switch between multiple apps for video sessions.Real-time discussions and lectures with educators.Visualizers for pathfinding and sorting algorithms. User-friendly interface: Intuitive and easy to navigate.</p>
                <h2>Start Now <span className='arrow'>&rarr;</span></h2>
                 <Button
              variant="contained"
              color="primary"
              onClick={() => setInCall(true)}
              id='joinCall'
            >
              Join Call
            </Button>
              </div>
          </div>
           
        </div>
      )}
    </div>
  );
}

export default VideoClassScreen;