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

  const animatedBgStyle = {
    background: 'linear-gradient(270deg, #232526, #414345, #0f0c29, #302b63, #24243e, #ADD8E6)',
    backgroundSize: '800% 800%',
    animation: 'gradientAnimation 10s ease infinite',
  };

  return (
    <div>
      <div className="px-4 py-4 overflow-hidden shadow min-w-screen m-24 mb-32 rounded-3xl flex flex-col items-center max-w-4xl mx-auto" style={animatedBgStyle}>
        <h2 className="text-4xl font-bold mb-4 text-white">Select Your School</h2>
        <div className="w-full mb-4">
          <input
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="w-full text-lg p-3 shadow-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing to search for a school..."
          />
          {filteredSchools.length > 0 && (
            <ul className="border bg-white border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
              {filteredSchools.map((school, index) => (
                <li
                  key={index}
                  onClick={() => handleSchoolSelect(school)}
                  className="p-3 cursor-pointer hover:bg-gray-100"
                >
                  {school}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleValidation}
          className="w-1/2-full align-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Find a match
        </button>
      </div>

      <style>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default FindMatch;
