import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import uitoolkit from '@zoom/videosdk-ui-toolkit';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';

export function VideoCall() {
    const { sessionName } = useParams();  // Get the session name from the URL
    const location = useLocation();       // Get query parameters (e.g., token)
    const query = new URLSearchParams(location.search);
    const code = query.get('=code');     // Extract token from query string
    const [joined, setJoined] = useState(false);
    const [sessionContainer, setSessionContainer] = useState(null);

    useEffect(() => {
        if (token && sessionName && sessionContainer) {
        // Configuration for the session
        setJoined(true);
        var config = {
            videoSDKJWT: code,
            sessionName: sessionName,
            userName: '',
            sessionPasscode: '',
            features: ['preview', 'video', 'audio', 'share', 'chat', '', 'settings'],
            options: { 
                init: {}, 
                audio: {
                    backgroundNoiseSuppression: true,
                    syncButtonsOnHeadset: true
                }, 
                video: {}, 
                share: {optimizedForSharedVideo: true}
            },
            virtualBackground: {
              allowVirtualBackground: true,
              allowVirtualBackgroundUpload: true,
            }
          }

        // Join the session
        uitoolkit.joinSession(sessionContainer, config);

        // Event listeners to handle session events
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
    }, [token, sessionName, sessionContainer]);

    return (
        <>
        <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
            <div
            className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
            {!joined && (
                <button onClick={() => setSessionContainer(document.getElementById('sessionContainer'))}>
                    Join Session
                </button>)
            }

            {/* The UI Toolkit will render the video session here, including its prebuilt leave button */}
            <div id="sessionContainer" style={{ height: '600px', width: '100%' }}></div>
            <div
            className="absolute inset-x-0 top-[calc(100%-100rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-100rem)]"
            aria-hidden="true"
            >
            <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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
