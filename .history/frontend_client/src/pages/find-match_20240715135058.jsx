import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    // Navigate to the FindGuide page and pass the selected school
    navigate('/find-guide', { state: { school: selectedSchool } });
  };

  if (loading) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <p className="text-center text-3xl">Something went wrong. Try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
      <div
        className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='my-28'>
      </div>
      <div className='my-28'>
      </div>
      <br></br>
      <div className="bg-white px-4 py-4 overflow-hidden mt-24 shadow rounded-lg border max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Select Your School</h2>
        <div className="mb-4">
          <input
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="w-full p-2 border border-gray-300 rounded focus:border-gray-900"
            placeholder="Start typing to search for a school..."
          />
          {filteredSchools.length > 0 && (
            <ul className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Find a match
        </button>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(80%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(80%-40rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(15%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(15%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  
  );
};

export default FindMatch;
