import React from 'react';
import { Select, Option, Typography } from "@material-tailwind/react";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import categoriesData from './majors.json';

const GuideFilters = ({ selectedCategory, handleCategoryChange }) => {

  return (
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
          background: linear-gradient(270deg, #f5fafa, #1c1f1f, #969ea3);
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
      <div className='gradient-border'>
            <div className="mb-4 bg-white max-w-md mx-auto p-4 rounded-xl">
        <Select label="Filter by Major" onChange={handleCategoryChange}>
          <Option value="" selected>
            All Categories
          </Option>
          {Object.keys(categoriesData).map((category) => (
            <Option key={category} value={category} selected={category === selectedCategory}>
              {category}
            </Option>
          ))}
        </Select>
        <div className="mt-4">
          <Typography variant="medium" className="text-center font-medium text-gray-700 mb-2">
            Icons:
          </Typography>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Diversity3OutlinedIcon className="text-[#ca8a04] mr-2" />
              <Typography variant="small" className="text-gray-700">Greek Life</Typography>
            </div>
            <div className="flex items-center">
              <EmojiEventsIcon className="text-[#eab308] mr-2" />
              <Typography variant="small" className="text-gray-700">Student Athlete</Typography>
            </div>
            <div className="flex items-center">
              <WorkIcon className="text-[#4d7c0f] mr-2" />
              <Typography variant="small" className="text-gray-700">Paid Internship Experience</Typography>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default GuideFilters;
