import TripMap from "@/pages/tripHelper/trip-map";
import TripForm from "@/pages/tripHelper/trip-form";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuthenticated } from "./../tools/auth/loggedIn";

export function BuildTrip() {
  const [showMap, setShowMap] = useState(false);
  const [tripForm, setTripForm] = useState(true);
  const [personalizedMessage, setPersonalizedMessage] = useState("");
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Additional input handling for 'source' and 'additionalInfo'
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

  // Function to handle form submission
  const handleSubmit = async (e, newformData, newSchools) => {
    e.preventDefault();

    if (!isAuthenticated()) {
        window.location.href = "/sign-up";
        return;
    }

    // Convert form data to a string
    const formDataString = Object.entries(newformData)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    // Set the schools for the map immediately
    setSchools(newSchools);
    try {
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendCustomRequest', { data: newformData, email: sessionStorage.username });
    } catch (error) {
        console.error('Error fetching personalized message:', error);
        alert('There was an error generating your personalized message.');
    }
    // Reset form state and show the map
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
    setTripForm(false);
    setShowMap(true);

    // Fetch user info and personalized message asynchronously without blocking UI
    axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/accountInfo', { email: sessionStorage.username })
      .then((userInfoResponse) => {
        const userInfo = userInfoResponse.data;

        // Add user info to the form data string
        const completeString = `${formDataString}, User Info: ${JSON.stringify(userInfo)}`;

        // Call personalize API
        return axios.post('https://en7d12lkv8.execute-api.us-east-2.amazonaws.com', { prompt: completeString });
      })
      .then((personalizedResponse) => {
        // Set the personalized message once the API response is received
        setPersonalizedMessage(personalizedResponse.data.message.content[0].text);
      })
      .catch((error) => {
        console.error('Error fetching personalized message:', error);
        alert('There was an error generating your personalized message.');
      });
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
            <div className="bg-white mt-40 px-6 py-6 rounded-lg mx-auto">
              <div className="w-full mb-6 text-center">
                  <h1 className="text-2xl sm:text-4xl leading-7 text-black mb-8">Thanks for submitting an itinerary request </h1>
                  <h1 className="text-lg sm:text-xl leading-7 text-black mb-2">Checkout your spots on the map while we get back to you.</h1>
                  <TripMap schools={schools} />
                  {/* Display the personalized message below the map */}
                  {personalizedMessage && (
                    <div className="mt-10">
                      <h2 className="text-md sm:text-lg text-black font-bold">Our Message to You:</h2>
                      <p className="text-sm sm:text-lg text-black mt-4">{personalizedMessage}</p>
                    </div>
                  )}
              </div>
            </div>
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
