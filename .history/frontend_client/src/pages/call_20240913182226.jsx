import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uitoolkit from '@zoom/videosdk-ui-toolkit';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';

export function VideoCall() {
  const { pathname } = useLocation();
  const sessionName = pathname.split('/').pop();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get('code');
  const [sessionContainer, setSessionContainer] = useState(null);

  useEffect(() => {
    if (code && sessionName && sessionContainer) {
      const config = {
        videoSDKJWT: code,
        sessionName: sessionName,
        userName: 'Guest User',
        sessionPasscode: '',
        features: ['preview', 'video', 'audio', 'share', 'chat', 'settings'],
        options: {
          init: {
            enforceMultipleVideos: true,
            enforceVirtualBackground: true,
          },
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

      uitoolkit.joinSession(sessionContainer, config);

      uitoolkit.onSessionJoined(() => {
        console.log('Session joined successfully');
      });

      uitoolkit.onSessionClosed(() => {
        console.log('Session closed');
        uitoolkit.closeSession(sessionContainer);
      });

      return () => {
        uitoolkit.closeSession(sessionContainer);
      };
    }
  }, [code, sessionName, sessionContainer]);

  return (
    <div className="relative isolate px-3 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
      <div id="join-flow" className="mt-48 flex-col justify-center align-center mx-auto">
        {/* Session Container */}
        <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
               Discover your campus, make it yours
        </h1>
        <div
          id="sessionContainer"
          className="w-full max-w-4xl rounded-lg mx-auto"
          ref={(el) => setSessionContainer(el)}
        />
      </div>

      {/* Optional: Include any background or decorative components */}
      <div
        className="absolute inset-x-0 -z-10 transform overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 w-[36rem] sm:w-[72rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-blue-800 to-cyan-400 opacity-60"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}

export default VideoCall;
