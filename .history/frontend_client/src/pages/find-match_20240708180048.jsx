import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const FindMatch = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/schoolNames');
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

  const handleSchoolChange = (selectedOption) => {
    setSelectedSchool(selectedOption);
  };

  const handleValidation = () => {
    if (!selectedSchool) {
      alert('Please select a school.');
      return;
    }

    // Perform validation logic or navigate to next step
    alert(`Selected school: ${selectedSchool.label}`);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4">{error}</p>;
  }

  const filteredSchools = (inputValue) => {
    return schools.filter((school) =>
      school.toLowerCase().includes(inputValue.toLowerCase())
    ).map((school) => ({ value: school, label: school }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Select Your School</h2>
        <div className="mb-4">
          <Select
            value={selectedSchool}
            onChange={handleSchoolChange}
            options={filteredSchools('')}
            onInputChange={(inputValue) => setSchools(filteredSchools(inputValue))}
            placeholder="Select a school..."
            isClearable
            isSearchable
            className="w-full"
          />
        </div>
        <button
          onClick={handleValidation}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Validate Choice
        </button>
      </div>
    </div>
  );
};

export default FindMatch;
