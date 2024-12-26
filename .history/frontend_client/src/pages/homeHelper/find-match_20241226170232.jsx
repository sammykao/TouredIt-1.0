import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindMatch = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const currentVersion = "1.0";

  // Fetch schools data
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
        const response = await axios.post(
          "https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/schoolNames"
        );
        const fetchedSchools = [...new Set(response.data.schools)];
        setSchools(fetchedSchools);

        // Cache the data
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

  // Filter schools based on input
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

  // Select a school
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setFilteredSchools([]);
  };

  // Validate and navigate
  const handleValidation = () => {
    if (!selectedSchool || !schools.includes(selectedSchool)) {
      alert("Please select a valid school from the list.");
      return;
    }

    navigate(`/find-guide/${encodeURIComponent(selectedSchool)}`);
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 pt-14">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-current border-r-transparent"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center mt-16 mb-16 justify-center px-6 pt-14">
        <p className="text-center text-lg text-gray-600">
          Something went wrong. Try again later :/
        </p>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="px-4 py-4 overflow-hidden min-w-screen mt-12 mb-24 rounded-3xl flex flex-col items-center max-w-4xl mx-auto"
    >
      <div className="w-full relative">
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
          <input
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="flex-grow text-lg p-4 rounded-l-full focus:outline-none bg-white"
            placeholder="Search for a school..."
          />
          <button
            onClick={handleValidation}
            className="text-lg font-semibold py-4 px-6 bg-blue-600 text-white hover:bg-blue-800 focus:outline-none"
          >
            Search
          </button>
        </div>
        <ul className="absolute w-full bg-white rounded mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school, index) => (
              <li
                key={`${school}-${index}`}
                onClick={() => handleSchoolSelect(school)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {school}
              </li>
            ))
          ) : (
            selectedSchool && (
              <li className="p-2 text-gray-500">No results found</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default FindMatch;
