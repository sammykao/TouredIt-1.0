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
