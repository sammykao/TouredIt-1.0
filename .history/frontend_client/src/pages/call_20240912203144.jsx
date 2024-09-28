import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uitoolkit from '@zoom/videosdk-ui-toolkit';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';
import './VideoCall.css'; // Import the CSS file

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
        console.log('
