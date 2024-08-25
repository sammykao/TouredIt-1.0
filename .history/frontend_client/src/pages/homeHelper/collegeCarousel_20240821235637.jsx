import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";

export function SchoolCarousel() {
  const [schools, setSchools] = useState(["Tufts University", "Harvard College", "Stanford"]);
  const [schoolInfo, setSchoolInfo] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      const fetchedData = [];
      for (const school of schools) {
        try {
          const response = await axios.post(
            "https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/schoolInfo",
            { name: school }
          );
          fetchedData.push(response.data);
        } catch (error) {
          console.error(`Error fetching data for ${school}:`, error);
        }
      }
      setSchoolInfo(fetchedData);
    };

    fetchSchoolInfo();
  }, [schools]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % schoolInfo.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [schoolInfo.length]);

  const handleCardClick = (schoolName) => {
    window.location.href = `find-guide?school=${encodeURIComponent(schoolName)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <Carousel
        className="rounded-xl"
        activeIndex={activeIndex}
        onChange={(index) => setActiveIndex(index)}
      >
        {schoolInfo.map((info, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleCardClick(info.name)}
          >
            <img
              src={info.logo_url}
              alt={`${info.name} logo`}
              className="w-24 h-24 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{info.name}</h2>
            <p className="text-gray-500 mb-2">{info.location}</p>
            <p className="text-gray-700 mb-4">Type: {info.type}</p>
            <p className="text-gray-700 mb-4">
              Undergraduate Population: {info.undergraduate_population}
            </p>
            <p className="text-gray-700 mb-2">
              In-State Tuition: ${info.instate_tuition.toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">
              Out-of-State Tuition: ${info.outstate_tuition.toLocaleString()}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;
