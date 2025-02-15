import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";

export function SchoolCarousel() {
  const [schools, setSchools] = useState(["Harvard", "MIT", "Stanford"]);
  const [schoolInfo, setSchoolInfo] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      const fetchedData = [];
      for (const school of schools) {
        try {
          const response = await axios.post(
            "https://api.example.com/getSchoolInfo",
            { schoolName: school }
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
    window.location.href = `find-guide?name=${encodeURIComponent(schoolName)}`;
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
            <h2 className="text-2xl font-bold mb-2">{info.name}</h2>
            <p className="text-gray-700 mb-4">{info.description}</p>
            <img
              src={info.imageUrl}
              alt={`${info.name} image`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;