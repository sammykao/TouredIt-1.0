import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

export function SchoolCarousel() {
  const [schools, setSchools] = useState([
    "University of Southern California",
    "Cornell University",
    "University of Pennsylvania",
    "Brown University",
    "University of Michigan",
    "University of California, Los Angeles",
    "Tufts University", 
    "Harvard College", 
]);
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
    return str.split(' ')[0];
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10 relative">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">Popular Colleges</h1>
      <Carousel
        selectedItem={activeIndex}
        onChange={(index) => setActiveIndex(index)}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
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
              className="h-20 object-contain rounded-lg mb-6"
            />
            <h2 className="text-4xl font-bold mb-4 text-gray-800">{info.name}</h2>

            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Location Section - Spans full width */}
              <div className="col-span-2 flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
                <LocationOnIcon className="text-green-500 text-3xl mb-2" />
                <p className="text-lg text-gray-500">Location</p>
                <p className="text-xl text-gray-800">{info.location}</p>
              </div>

              {/* Type Section */}
              <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
                <SchoolIcon className="text-blue-500 text-3xl mb-2" />
                <p className="text-md text-gray-500">Type</p>
                <p className="text-lg text-gray-800">{getFirstWord(info.type)}</p>
              </div>

              {/* Undergraduate Population Section */}
              <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
                <PeopleIcon className="text-purple-500 text-3xl mb-2" />
                <p className="text-md text-gray-500">Population</p>
                <p className="text-lg text-gray-800">{info.undergraduate_population.toLocaleString()}</p>
              </div>

              {/* In-State Tuition Section */}
              <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
                <AttachMoneyIcon className="text-pink-300 text-5xl mb-2" />
                <p className="text-md text-gray-500">In-State Tuition</p>
                <p className="text-lg text-gray-800">{info.instate_tuition.toLocaleString()}</p>
              </div>

              {/* Out-of-State Tuition Section */}
              <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
                <AttachMoneyIcon className="text-red-800 text-5xl mb-2" />
                <p className="text-md text-gray-500">Out-of-State Tuition</p>
                <p className="text-lg text-gray-800">{info.outstate_tuition.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SchoolCarousel;
