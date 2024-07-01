import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindMatch = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
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

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  const handleValidation = () => {
    if (!selectedSchool) {
      alert('Please select a school.');
      return;
    }

    // Perform validation logic or navigate to next step
    alert(`Selected school: ${selectedSchool}`);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4">{error}</p>;
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Select Your School</h2>
        <div className="mb-4">
          <select
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="w-full p-2 border border-gray-300 rounded focus:border-gray-900"
          >
            <option value="">Select a school...</option>
            {schools.map((school, index) => (
              <option key={index} value={school}>{school}</option>
            ))}
          </select>
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