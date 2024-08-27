import React from 'react';
import { Select, Option, Typography } from "@material-tailwind/react";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import categoriesData from './majors.json';

const GuideFilters = ({ selectedCategory, handleCategoryChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    handleCategoryChange(selectedValue);
  };

  return (
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
            <SportsBarIcon className="text-[#ca8a04] mr-2" />
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
  );
};

export default GuideFilters;
