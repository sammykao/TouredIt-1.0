import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ZoomVideo, ZoomAudio } from '@zoom/videosdk'; // Import Zoom SDK

export function VideoCall() {
  const { pathname } = useLocation();
  const sessionName = pathname.split('/').pop();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get('code');
  const [session, setSession] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  useEffect(() => {
    if (code && sessionName) {
      const initZoomSession = async () => {
        const zoomSession = await ZoomVideo.init({
          videoSDKJWT: code,
          sessionName: sessionName,
          userName: 'Guest User',
        });

        // Start the session
        await zoomSession.join();
        setSession(zoomSession);
        console.log('Session joined successfully');
      };

      initZoomSession();

      return () => {
        if (session) {
          session.leave(); // Leave the session when component unmounts
        }
      };
    }
  }, [code, sessionName]);

  // Function to toggle video
  const handleVideoToggle = async () => {
    if (isVideoOn) {
      await ZoomVideo.stopVideo();
      setIsVideoOn(false);
    } else {
      await ZoomVideo.startVideo();
      setIsVideoOn(true);
    }
  };

  // Function to toggle audio
  const handleAudioToggle = async () => {
    if (isAudioOn) {
      await ZoomAudio.mute();
      setIsAudioOn(false);
    } else {
      await ZoomAudio.unmute();
      setIsAudioOn(true);
    }
  };

  return (
    <>
      <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gradient-to-r from-blue-900 via-blue-500 to-blue-300 flex flex-col items-center">
        <div id="join-flow" className="mt-32 justify-center mx-auto flex">
          {/* Session Container */}
          <div id="sessionContainer" className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl" />
        </div>

        {/* Custom Controls */}
        <div className="controls flex justify-center mt-6 space-x-4">
          <button
            className={`btn-control px-4 py-2 rounded-md font-semibold text-white ${
              isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={handleVideoToggle}
          >
            {isVideoOn ? 'Stop Video' : 'Start Video'}
          </button>
          <button
            className={`btn-control px-4 py-2 rounded-md font-semibold text-white ${
              isAudioOn ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleAudioToggle}
          >
            {isAudioOn ? 'Mute' : 'Unmute'}
          </button>
          {/* Add more custom buttons as needed */}
        </div>

        {/* Optional Background Decoration */}
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-800 to-cyan-400 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
s