import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ZoomVideo from '@zoom/videosdk'; // Import Zoom SDK

export function VideoCall() {
  const { pathname } = useLocation();
  const sessionName = pathname.split('/').pop();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get('code');
  const [session, setSession] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [micList, setMicList] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);
  const [virtualBackgrounds, setVirtualBackgrounds] = useState([]);

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

        // Get available audio devices
        const audioDevices = zoomSession.audio.getAudioDevices();
        setMicList(audioDevices.microphones);
        setSpeakerList(audioDevices.speakers);

        // Get available virtual backgrounds
        const vbgList = zoomSession.video.getVirtualBackgroundList();
        setVirtualBackgrounds(vbgList);
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
      await session.video.stop();
      setIsVideoOn(false);
    } else {
      await session.video.start();
      setIsVideoOn(true);
    }
  };

  // Function to toggle audio
  const handleAudioToggle = async () => {
    if (isAudioOn) {
      await session.audio.mute();
      setIsAudioOn(false);
    } else {
      await session.audio.unmute();
      setIsAudioOn(true);
    }
  };

  // Function to change mic
  const handleMicChange = async (deviceId) => {
    await session.audio.switchMicrophone(deviceId);
  };

  // Function to change speaker
  const handleSpeakerChange = async (deviceId) => {
    await session.audio.switchSpeaker(deviceId);
  };

  // Function to apply virtual background
  const handleVirtualBackground = async (vbgId) => {
    await session.video.applyVirtualBackground(vbgId);
  };

  return (
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
      </div>

      {/* Mic and Speaker Selection */}
      <div className="audio-controls mt-6">
        <label className="block mb-2">Microphone:</label>
        <select
          className="px-4 py-2 rounded-md"
          onChange={(e) => handleMicChange(e.target.value)}
        >
          {micList.map((mic, index) => (
            <option key={index} value={mic.deviceId}>
              {mic.label}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Speaker:</label>
        <select
          className="px-4 py-2 rounded-md"
          onChange={(e) => handleSpeakerChange(e.target.value)}
        >
          {speakerList.map((speaker, index) => (
            <option key={index} value={speaker.deviceId}>
              {speaker.label}
            </option>
          ))}
        </select>
      </div>

      {/* Virtual Background Selection */}
      <div className="virtual-bg-controls mt-6">
        <label className="block mb-2">Virtual Background:</label>
        <select
          className="px-4 py-2 rounded-md"
          onChange={(e) => handleVirtualBackground(e.target.value)}
        >
          {virtualBackgrounds.map((bg, index) => (
            <option key={index} value={bg.id}>
              {bg.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default VideoCall;
