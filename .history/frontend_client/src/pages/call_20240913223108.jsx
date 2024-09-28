import React, { useEffect, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

export function VideoCall() {
  const [callFrame, setCallFrame] = useState(null);
  const roomUrl = "https://your-team.daily.co/your-room"; // Replace with your Daily room URL

  useEffect(() => {
    if (!callFrame) {
      const frame = DailyIframe.createFrame({
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
        },
        // Enable the pre-join UI where users can enter their name
        enable_prejoin_ui: true,
        // Enable showing participants (users) in the UI
        enable_people_ui: true,
        // Hide Daily branding
        hide_daily_branding: true,
      });

      frame.join({ url: roomUrl }).catch((err) => console.error(err));
      setCallFrame(frame);
    }

    return () => {
      callFrame?.leave(); // Clean up when the component is unmounted
    };
  }, [callFrame, roomUrl]);

  return (
    <div className="relative isolate px-3 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
      <div id="join-flow" className="mt-36 flex-col justify-center align-center mx-auto">
        {/* Session Container */}
        <h1 className="text-xl text-center font-bold mb-8 tracking-tight text-blue-700 sm:text-3xl">
          TouredIt Video Call
        </h1>
        <div
          id="sessionContainer"
          className="w-full rounded-lg mx-auto"
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
    <div id="video-container" style={{ height: '500px' }} />
  );
}

export default VideoCall;

    <div className="relative isolate px-3 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
      <div id="join-flow" className="mt-36 flex-col justify-center align-center mx-auto">
        {/* Session Container */}
        <h1 className="text-xl text-center font-bold mb-8 tracking-tight text-blue-700 sm:text-3xl">
          TouredIt Video Call
        </h1>
        <div
          id="sessionContainer"
          className="w-full rounded-lg mx-auto"
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
