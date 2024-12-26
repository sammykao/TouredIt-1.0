import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";
import SearchIcon from '@mui/icons-material/Search';

const FindMatch = () => {
  const [schools, setSchools] = useState([]);  // Stores list of schools
  const [filteredSchools, setFilteredSchools] = useState([]);  // Filtered list of schools based on input
  const [selectedSchool, setSelectedSchool] = useState('');  // Currently selected school
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();

  const currentVersion = "1.0"; // Update this with each deployment

  useEffect(() => {
    const fetchSchools = async () => {
      const cachedVersion = localStorage.getItem("cacheVersion");
      const cachedSchools = localStorage.getItem("cachedSchools");
  
      if (cachedSchools && cachedVersion === currentVersion) {
        setSchools(JSON.parse(cachedSchools));
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/schoolNames');
        let fetchedSchools = [...new Set(response.data.schools)];
        setSchools(fetchedSchools);
  
        // Cache the new data with the current version
        localStorage.setItem("cachedSchools", JSON.stringify(fetchedSchools));
        localStorage.setItem("cacheVersion", currentVersion);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schools:", error);
        setError("Error fetching schools. Please try again later.");
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Update filteredSchools based on user input
  const handleSchoolChange = (e) => {
    try {
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
    } catch (error) {
      console.error('Error filtering schools:', error);
    }
  };

  // Handle school selection
  const handleSchoolSelect = (school) => {
    try {
      setSelectedSchool(school);  // Set the selected school when clicked
      setFilteredSchools([]);  // Clear the dropdown list after selection
    } catch (error) {
      console.error('Error selecting school:', error);
    }
  };

  // Validate the selected school and navigate to the "find-guide" page
  const handleValidation = () => {
    try {
      if (!selectedSchool || !schools.includes(selectedSchool)) {
        alert('Please select a valid school from the list.');
        return;
      }

      // Navigate to the FindGuide page using query strings
      navigate(`/find-guide/${encodeURIComponent(selectedSchool)}`);
    } catch (error) {
      console.error('Error during validation or navigation:', error);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex mb-32 items-center justify-center px-6 pt-14">
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

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center mt-16 mb-16 justify-center px-6 pt-14">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-lg lg:!text-xl text-center"
        > Something went wrong. Try again later :/</Typography>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 overflow-hidden min-w-screen mt-12 mb-16 rounded-3xl flex flex-col items-center max-w-4xl mx-auto">
      <div className="w-full mb-4">
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-300   focus focus-within:ring-blue-500 overflow-hidden">
          <input
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="flex-grow text-lg p-4 focus:outline-none bg-white text-lg md:text-2xl p-2 lg:p-4"
            placeholder="Search for a school..."
          />
          <button
            onClick={handleValidation}
            className="text-lg md:text-2xl font-semibold py-4 px-6 bg-blue-600 text-white"
          >
            <SearchIcon />
          </button>
        </div>
        <div>
          <ul className="bg-white rounded mt-2 max-h-60 overflow-y-auto">
            {filteredSchools.length > 0 &&
              filteredSchools.map((school, index) => (
                <li
                  key={`${school}-${index}`}  // Ensure each key is unique
                  onClick={() => handleSchoolSelect(school)}  // Select the clicked school
                  className="p-2 lg:p-3 cursor-pointer hover:bg-gray-100"
                >
                  {school}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

    </div>
  );
};

export default FindMatch;
