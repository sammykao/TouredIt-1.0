import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const GuideCard = ({ guide, handleDetails }) => (
  <>
    <style jsx>{`
      @keyframes gradient-border {
      0% {
          background-position: 0% 50%;
      }
      100% {
          background-position: 100% 50%;
      }
      }

      .gradient-border {
      position: relative;
      padding: 4px;
      border-radius: 8px; /* Rounded corners */
      background: linear-gradient(270deg, #0d63d4, white, #0d63d4);
      background-size: 800% 200%; /* This makes the gradient large enough to animate */
      animation: gradient-border 7s linear infinite alternate; /* Animation for moving gradient */
      }

      .gradient-border::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      border-radius: 8px;
      background-color: white; /* Inner content background */
      background-clip: padding-box;
      }
    `}</style>
    <div>

    </div>
    
  </>
);

export default GuideCard;
