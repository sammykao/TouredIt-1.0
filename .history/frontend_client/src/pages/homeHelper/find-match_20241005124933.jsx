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

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/schoolNames');
        let fetchedSchools = response.data.schools;
        

        // Log any duplicates for debugging purposes
        const duplicates = fetchedSchools.filter((item, index) => fetchedSchools.indexOf(item) !== fetchedSchools.lastIndexOf(item));
        if (duplicates.length > 0) {
          console.warn('Found duplicate school names:', duplicates);
        }

        // Remove duplicates using Set
        fetchedSchools = [...new Set(fetchedSchools)];
        setSchools(fetchedSchools);  // Store the list of schools with duplicates removed
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError('Error fetching schools. Please try again later.');
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
      console.log('Valid school selected:', selectedSchool);

      // Navigate to the FindGuide page using query strings
      navigate(`/find-guide?school=${encodeURIComponent(selectedSchool)}`);
    } catch (error) {
      console.error('Error during validation or navigation:', error);
    }
  };

  // Handle loading state
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

  // Handle error state
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
    <div className="px-4 py-4 overflow-hidden shadow bg-gradient-to-r from-blue-200 to-indigo-300 min-w-screen m-24 rounded-3xl flex flex-col items-center max-w-4xl mx-auto">
      <h2 className="text-3xl lg:text-4xl font-bold mb-4">Select Your School</h2>
      <div className="w-full mb-4">
        <input
          type="text"
          value={selectedSchool}
          onChange={handleSchoolChange}  // Filter schools as the user types
          className="w-full text-md lg:text-lg p-2 lg:p-3 shadow-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Start typing to search for a school..."
        />
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
      <button
        onClick={handleValidation}  // Validate the selection and navigate
        className="w-full lg:w-1/2 align-center bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 lg:py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Find a match
      </button>
    </div>
  );
};

export default FindMatch;
