import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ZoomVideo from '@zoom/videosdk';

export function VideoCall() {
  const { sessionName } = useParams(); // Get the session name from the URL
  const location = useLocation();      // Get the query string (to retrieve token)
  const query = new URLSearchParams(location.search);
  const token = query.get('token');    // Extract token from query string

  useEffect(() => {
    if (token && sessionName) {
      // Initialize the Zoom Video SDK
      const client = ZoomVideo.createClient();
      client.init('en-US', 'CDN'); // Initialize with language and source type

      // Join the session with token and session name
      client.join(token, sessionName, "", "")
        .then(() => {
          console.log("Joined session successfully");

          // Start video rendering
          const stream = client.getMediaStream();
          stream.startVideo({
            videoElement: document.getElementById('zoom-video'), // Render video here
            width: 640,
            height: 360,
          });
        })
        .catch((error) => {
          console.error("Error joining session:", error);
        });

      return () => {
        client.leave(); // Clean up the session when the component unmounts
      };
    }
  }, [token, sessionName]);

  return (
    <div>
      <h2>Zoom Video Call: {sessionName}</h2>
      {/* This is where the video will be rendered */}
      <div id="zoom-video" style={{ width: '640px', height: '360px', background: '#000' }}></div>
    </div>
  );
}

export default VideoCall;
