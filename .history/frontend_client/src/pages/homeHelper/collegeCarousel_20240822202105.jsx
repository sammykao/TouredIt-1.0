import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

  const handleCardClick = (schoolName) => {
    window.location.href = `find-guide?school=${encodeURIComponent(schoolName)}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <Carousel
        selectedItem={activeIndex}
        onChange={(index) => setActiveIndex(index)}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={200}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-black bg-opacity-70 hover:bg-opacity-90 p-6 rounded-full"
            >
              &lt;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 text-4xl transform -translate-y-1/2 right-0 bg-opacity-70 hover:bg-opacity-90 p-6 rounded-full"
            >
             &gt;
            </button>
          )
        }
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
              className="h-20 object-contain rounded-lg mb-6"
            />
            <h2 className="text-4xl font-semibold mb-4 text-gray-800">{info.name}</h2>
            <p className="text-lg text-gray-700 mb-2">{info.location}</p>
            <p className="text-lg text-gray-700 mb-2">
              Undergraduate Population: {info.undergraduate_population.toLocaleString()}
            </p>
            <p className="text-lg text-gray-700">
              In-State Tuition: {info.instate_tuition.toLocaleString()}
            </p>
            <p className="text-lg text-gray-700">
              Out-of-State Tuition: {info.outstate_tuition.toLocaleString()}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;
