import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";

const FindMatch = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/schoolNames');
        setSchools(response.data.schools);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError('Error fetching schools. Please try again later.');
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleSchoolChange = (e) => {
    const inputValue = e.target.value;
    setSelectedSchool(inputValue);
    if (inputValue) {
      const filtered = schools.filter((school) =>
        school.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools([]);
    }
  };

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setFilteredSchools([]);
  };

  const handleValidation = () => {
    if (!selectedSchool) {
      alert('Please select a school.');
      return;
    }

    // Navigate to the FindGuide page using query strings
    navigate(`/find-guide?school=${encodeURIComponent(selectedSchool)}`);
  };

  if (loading) {
    return (
      <div className="flex m-24 mb-32 items-center justify-center px-6 pt-14">
        <div
          className="justify-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center m-24 mb-32 justify-center px-6 pt-14">
        <Typography
        variant="h5"
        color="blue-gray"
        className="mb-4 !text-lg lg:!text-xl text-center"
      > Something went wrong. Try again later :/</Typography>
      </div>
    );
  }

  return (
      <div ">
        <h2 className="text-3xl font-bold mb-4">Select Your School</h2>
        <div>
          <div className="w-full mb-4">
            <input
              type="text"
              value={selectedSchool}
              onChange={handleSchoolChange}
              className="w-full text-xl p-2 shadow rounded focus:outline-none focus:bg-gray-400"
              placeholder="Start typing to search for a school..."
            />
            {filteredSchools.length > 0 && (
              <ul className="border bg-white border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
                {filteredSchools.map((school, index) => (
                  <li
                    key={index}
                    onClick={() => handleSchoolSelect(school)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {school}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleValidation}
            size="xs"
            variant="gradient"
            className="bg-blue-700 hover:bg-blue-900 shadow text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Find a match
          </button>
        </div>
      </div>
  );
};

export default FindMatch;
