import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";

export function SchoolCarousel() {
  const [schools, setSchools] = useState(["Tufts University", "Harvard College", "Cornell University"]);
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
          fetchedData.push(response.data.school);
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
    }, 3000); // Slower rotation every 3 seconds

    return () => clearInterval(interval);
  }, [schoolInfo.length]);

  const handleCardClick = (schoolName) => {
    window.location.href = `find-guide?school=${encodeURIComponent(schoolName)}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <Carousel
        className="rounded-xl"
        activeIndex={activeIndex}
        onChange={(index) => setActiveIndex(index)}
        navButtonProps={{
          className: "bg-black bg-opacity-70 hover:bg-opacity-90",
        }}
      >
        {schoolInfo.map((info, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleCardClick(info.name)}
          >
            <img
              src={info.logo_url}
              alt={`${info.name} logo`}
              className="w-60 h-60 object-cover rounded-lg mb-6"
            />
            <h2 className="text-4xl font-semibold mb-4 text-gray-800">{info.name}</h2>
            <p className="text-lg text-gray-700 mb-2">{info.location}</p>
            <p className="text-lg text-gray-700 mb-2">
              Undergraduate Population: {info.undergraduate_population.toLocaleString()}
            </p>
            <p className="text-lg text-gray-700">
              In-State Tuition: ${info.instate_tuition.toLocaleString()}
            </p>
            <p className="text-lg text-gray-700">
              Out-of-State Tuition: ${info.outstate_tuition.toLocaleString()}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;
