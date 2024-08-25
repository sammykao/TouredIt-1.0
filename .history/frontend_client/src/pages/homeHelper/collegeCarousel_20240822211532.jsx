import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

  const getFirstWord = (str) => {
    console.log(str);
    return str.split(' ')[0];
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10 relative">
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
              className="absolute top-1/2 transform -translate-y-1/2 left-4 text-5xl bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full z-10"
              style={{ zIndex: 10 }}
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
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-5xl bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full z-10"
              style={{ zIndex: 10 }}
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
              className="w-1/2 object-contain rounded-lg mb-6"
            />
            <h2 className="text-4xl font-bold mb-4 text-gray-800">{info.name}</h2>

            {/* College Type Section */}
            <div className="flex items-center mb-2">
              <SchoolIcon className="text-gray-700 text-xl mr-2" />
              <p className="text-lg text-gray-600">{getFirstWord(info.type)}</p>
            </div>

            {/* Location Section */}
            <div className="flex items-center mb-2">
              <LocationOnIcon className="text-gray-700 text-xl mr-2" />
              <p className="text-lg text-gray-600">{info.location}</p>
            </div>

            {/* Undergraduate Population Section */}
            <div className="flex items-center mb-2">
              <SchoolIcon className="text-gray-700 text-xl mr-2" />
              <p className="text-lg text-gray-600">
                Undergraduate Population: {info.undergraduate_population.toLocaleString()}
              </p>
            </div>

            {/* In-State Tuition Section */}
            <div className="flex items-center mb-2">
              <AttachMoneyIcon className="text-gray-700 text-xl mr-2" />
              <p className="text-lg text-gray-600">
                In-State Tuition: {info.instate_tuition.toLocaleString()}
              </p>
            </div>

            {/* Out-of-State Tuition Section */}
            <div className="flex items-center">
              <AttachMoneyIcon className="text-gray-700 text-xl mr-2" />
              <p className="text-lg text-gray-600">
                Out-of-State Tuition: {info.outstate_tuition.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;
