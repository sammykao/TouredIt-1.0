import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const GuideCard = ({ guide, handleDetails }) => (
  <div
    key={guide.id}
    className="border shadow-lg rounded-lg hover:scale-105 duration-300 bg-white flex flex-col"
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
        <SportsBarIcon className="text-[#ca8a04]" />
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
);

export default GuideCard;
