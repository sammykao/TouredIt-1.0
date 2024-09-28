import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uitoolkit from '@zoom/videosdk-ui-toolkit';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';

export function VideoCall() {
  const { pathname } = useLocation();
  const sessionName = pathname.split('/').pop(); // Extract session name from the URL path
  const location = useLocation();  // Get query parameters (e.g., code)
  const query = new URLSearchParams(location.search);
  const code = query.get('code');  // Extract token from query string
  const [sessionContainer, setSessionContainer] = useState(null);

  useEffect(() => {
    if (code && sessionName && sessionContainer) {
      // Define the session configuration
      const config = {
        videoSDKJWT: code,
        sessionName: sessionName,
        userName: 'Guest User',  // Optionally replace with actual user name
        sessionPasscode: '',     // If required, add a session passcode
        features: ['preview', 'video', 'audio', 'share', 'chat', 'settings'],  // Features available in the UI
        options: {
          init: {}, 
          audio: {
            backgroundNoiseSuppression: true,
            syncButtonsOnHeadset: true,
          },
          video: {},
          share: { optimizedForSharedVideo: true },
        },
        virtualBackground: {
          allowVirtualBackground: true,
          allowVirtualBackgroundUpload: true,
        },
      };

      // Join the session using the Zoom Video SDK UI Toolkit
      uitoolkit.joinSession(sessionContainer, config);

      // Add event listeners
      uitoolkit.onSessionJoined(() => {
        console.log('Session joined successfully');
      });

      uitoolkit.onSessionClosed(() => {
        console.log('Session closed');
        uitoolkit.closeSession(sessionContainer);  // Clean up session
      });

      // Cleanup on component unmount
      return () => {
        uitoolkit.closeSession(sessionContainer);
      };
    }
  }, [code, sessionName, sessionContainer]);

  return (
    <>
      <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
        {/* Render the video session in this container */}
        <div className='mt-32 '>
            <div 
            id="sessionContainer"
            style={{ height: '1000px', width: '80%' }} 
            ref={(el) => setSessionContainer(el)} // Set sessionContainer state
            />
        </div>
       
        
        {/* Optional: Include any background or decorative components */}
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default VideoCall;
