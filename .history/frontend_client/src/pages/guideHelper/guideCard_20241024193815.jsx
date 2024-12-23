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
    <div className='shadow-lg hover:scale-105 gradient-border flex'>
      <div
        key={guide.id}
        className="rounded-lg bg-white flex-col"
      >
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-24 h-24 mb-4">
            <img 
              src={guide.profile_image_url} 
              alt={guide.name} 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div className="text-center">
            <p className="font-bold text-lg sm:text-xl">{guide.name}</p>
            <p className="text-md">{guide.major}</p>
            <p className="text-md">{guide.grad_year}</p>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 p-2">
          {guide.greek_life && (
            <Diversity3OutlinedIcon className="text-[#ca8a04]" />
          )}
          {guide.student_athlete && (
            <EmojiEventsIcon className="text-[#eab308]" />
          )}
          {guide.paid_internship && (
            <WorkIcon className="text-[#4d7c0f]" />
          )}
        </div>
        <div className="flex flex-col items-center justify-center p-4 overflow-hidden">
          <p className="text-sm text-center">{guide.bio}</p>
        </div>
        <div className="flex justify-center p-4 mt-4">
          <Button
            onClick={() => handleDetails(guide.email)}
            className="bg-blue-600 text-white rounded-lg"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
    
  </>
);

export default GuideCard;
