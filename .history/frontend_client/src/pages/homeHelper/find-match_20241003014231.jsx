import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";

const FindMatch = () => {
  const [schools, setSchools] = useState([]);  // Stores list of schools
  const [filteredSchools, setFilteredSchools] = useState([]);  // Filtered list of schools based on input
  const [selectedSchool, setSelectedSchool] = useState('');  // Currently selected school
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();

  // Fetching the list of schools when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/schoolNames');
        setSchools(response.data.schools);  // Store the list of schools
        setLoading(false);  // Set loading to false when data is loaded
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError('Error fetching schools. Please try again later.');  // Display error if the fetch fails
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Update filteredSchools based on user input
  const handleSchoolChange = (e) => {
    const inputValue = e.target.value;
    setSelectedSchool(inputValue);  // Set the selected school based on input

    if (inputValue) {
      const filtered = schools.filter((school) =>
        school.toLowerCase().includes(inputValue.toLowerCase())  // Filter schools based on user input
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools([]);  // Clear filtered schools if input is empty
    }
  };

  // Handle school selection
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);  // Set the selected school when clicked
    setFilteredSchools([]);  // Clear the filtered schools after selection
  };

  // Validate the selected school and navigate to the "find-guide" page
  const handleValidation = () => {
    if (!selectedSchool) {
      alert('Please select a school.');
      return;
    }
    
    // Navigate to the FindGuide page using query strings
    navigate(`/find-guide?school=${encodeURIComponent(selectedSchool)}`);
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-6">
        <Typography
          variant="h5"
          color="red"
          className="text-center text-xl"
        >
          Something went wrong. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Select Your School</h2>
        
        <div className="relative mb-4">
          <input
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}  // Filter schools as the user types
            className="w-full text-lg p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Start typing to search for a school..."
          />
          {filteredSchools.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg">
              {filteredSchools.map((school, index) => (
                <li
                key={school}  // Make sure to use the school name as the key, not index
                  onClick={() => handleSchoolSelect(school)}  // Select the clicked school
                  className="p-3 cursor-pointer hover:bg-gray-100 text-gray-900"
                >
                  {school}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleValidation}  // Validate the selection and navigate
          className="w-full py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Find a match
        </button>
      </div>
    </div>
  );
};

export default FindMatch;
