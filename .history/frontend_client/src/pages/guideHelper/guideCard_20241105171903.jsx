import React from 'react';
import { Button } from "@material-tailwind/react";
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
        padding: 5px;
        border-radius: 8px;
        background: linear-gradient(270deg, #0d63d4, white, #0d63d4);
        background-size: 800% 200%;
        animation: gradient-border 5s linear infinite alternate;
        width: 100%;
      }

      .inner-card {
        background-color: white;
        padding: 16px;
        border-radius: 8px;
        width: 100%;
      }
      .bio-truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
    `}</style>
    <div className="shadow-lg gradient-border flex justify-center">
      <div className="inner-card flex flex-col items-center">
        <div className="w-24 h-24 mb-4">
          <img
            src={guide.profile_image_url}
            alt={guide.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-lg md:text-xl">{guide.name}</p>
          <p className="text-md">{guide.major}</p>
          <p className="text-md">{guide.grad_year}</p>
        </div>
        <div className="flex justify-center items-center space-x-4 p-2">
          {guide.greek_life && <Diversity3OutlinedIcon className="text-[#ca8a04]" />}
          {guide.student_athlete && <EmojiEventsIcon className="text-[#eab308]" />}
          {guide.paid_internship && <WorkIcon className="text-[#4d7c0f]" />}
        </div>
        <div className="text-center p-4 overflow-hidden">
          <p className="text-sm">{guide.bio}</p>
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
