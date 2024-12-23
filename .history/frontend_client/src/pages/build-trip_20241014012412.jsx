import TripMap from "@/pages/tripHelper/trip-map";
import TripForm from "@/pages/tripHelper/trip-form";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuthenticated } from "./../tools/auth/loggedIn";

export function BuildTrip() {
  const [showMap, setShowMap] = useState(false);
  const [tripForm, setTripForm] = useState(true);
  const [formData, setFormData] = useState({
    school: '',
    major: '',
    grade: '',
    hobbies: '',
    clubs: '',
    interests: '',
    comments: '',
    date: '',
    greek_life: false,
    student_athlete: false,
    paid_internship: false,
    source: '',
    additionalInfo: '',
    referral_code: '',
  });
  const [schools, setSchools] = useState(null);

  
  
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSourceChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      source: value,
    }));
  };

  const handleAdditionalInfoChange = (e) => {
    const additionalInfo = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      additionalInfo: additionalInfo,
    }));
  };

  const handleSubmit = async (e, newformData, newSchools) => {
    e.preventDefault();
    if (!isAuthenticated()) {
        window.location.href = "/sign-up";
        return;
    } 
    try {
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendCustomRequest', { data: newformData, email: sessionStorage.username });
        setFormData({
            school: '',
            major: '',
            grade: '',
            hobbies: '',
            clubs: '',
            interests: '',
            comments: '',
            date: '',
            greek_life: false,
            student_athlete: false,
            paid_internship: false,
            source: '',
            additionalInfo: '',
            referral_code: '',
        });
    } catch (error) {
        console.error('Error sending request:', error);
        alert('There was an error submitting your request. Please try again later.');
    }
  };

  


  return (
    <>
      <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
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
        {
          showMap && (
            <TripMap schools={[["Boston University", "2024-05-01"], ["Harvard University", "2024-06-15"], ["University of California", "2024-06-18"]]} />
          )
        }
        {
          tripForm && (
            <div className="bg-white mt-40 px-6 py-6 rounded-lg mx-auto">
              <div className="w-full mb-6 text-center">
                <h1 className="text-2xl sm:text-4xl leading-7 text-black">Hi! Let's build an itinerary. </h1>
                <TripForm
                      formData={formData}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      handleSourceChange={handleSourceChange}
                      handleAdditionalInfoChange={handleAdditionalInfoChange}
                      setFormData={setFormData}
                />
              </div>
            </div>
          )
        }

        <div
          className="absolute inset-x-0 top-[calc(100%-100rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-100rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BuildTrip;
