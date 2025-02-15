import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, CarouselNavigation } from "@material-tailwind/react";

const SchoolCarousel = () => {
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
    }, 2000); // Faster rotation every 2 seconds

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
          className: "bg-black bg-opacity-50 hover:bg-opacity-70",
        }}
        navigation={({ setActiveIndex, activeIndex }) => (
          <div className="flex justify-center mt-4">
            {schoolInfo.map((_, index) => (
              <CarouselNavigation
                key={index}
                className={`h-3 w-3 mx-2 rounded-full ${
                  index === activeIndex ? "bg-black" : "bg-gray-400"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      >
        {schoolInfo.map((info, index) => (
          <div
            key={index}
            className="p-4 mb-8 bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleCardClick(info.name)}
          >
            <img
              src={info.logo_url}
              alt={`${info.name} logo`}
              className="w-full h-40 object-contain rounded-lg mb-4"
            />
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{info.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{info.location}</p>
            <p className="text-lg text-gray-600 mb-4">
              Undergraduate Population: {info.undergraduate_population.toLocaleString()}
            </p>
            <p className="text-lg text-gray-600">
              In-State Tuition: ${info.instate_tuition.toLocaleString()}
            </p>
            <p className="text-lg text-gray-600">
              Out-of-State Tuition: ${info.outstate_tuition.toLocaleString()}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;
