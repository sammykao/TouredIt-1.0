import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Tours() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const email = sessionStorage.username;
  const [confirmedTours, setConfirmedTours] = useState([]);
  const [pendingTours, setPendingTours] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:3000/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error);
        return;
      });

    axios.post("http://localhost:3000/api/retTours", { email })
      .then(tourResponse => {
        setConfirmedTours(tourResponse.data.confirmedTours);
        setPendingTours(tourResponse.data.nonConfirmedTours);
        console.log(tourResponse.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tours data:", error);
        setLoading(false);
      });

  }, [email]);

  const handleConfirm = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/confirmTour", { id });
      const confirmedTour = pendingTours.find(tour => tour.id === id);
      setPendingTours(prev => prev.filter(tour => tour.id !== id));
      setConfirmedTours(prev => [...prev, confirmedTour]);
    } catch (error) {
      setError(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/cancelTour", { id });
      setConfirmedTours(prev => prev.filter(tour => tour.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/declineTour", { id });
      setPendingTours(prev => prev.filter(tour => tour.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/home';
  };

  if (loading) {
    return (
      <div className="bg-black text-white flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-gray-700 shadow-md flex items-center p-4">
        <Typography className="text-2xl sm:text-3xl font-semibold text-white ml-4 sm:ml-12">
          Your Tours
        </Typography>
        <div className="ml-auto">
          <Button
            variant="gradient"
            onClick={handleLogout}
            size="sm"
            className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Log Out
          </Button>
        </div>
      </div>
      <div className="p-4 sm:p-8">
        <div className="max-w-xl sm:max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                src={responseData?.guide?.profile_image_url}
                alt="Profile"
                onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }}
              />
            </div>
            <div className="ml-0 md:ml-4 text-center md:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{responseData?.guide?.name}</h1>
              <div className="mt-2 flex flex-col sm:flex-row sm:space-x-2">
                <Link to="/profile" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center mb-2 sm:mb-0'>
                  Home
                </Link>
                <Link to="/update-activities" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-center mb-2 sm:mb-0'>
                  Update Activities
                </Link>
                <Link to="/update-hobbies" className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full text-center mb-2 sm:mb-0'>
                  Update Hobbies
                </Link>
                <Link to="/tours" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-center'>
                  Tours
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
            <ul className="text-gray-700">
              <li>Email: {responseData?.guide?.email}</li>
              <li>Phone: {responseData?.guide?.phone}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-8">
        <div className="max-w-xl sm:max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <div className="border-t border-gray-200 px-2 sm:px-4 py-4 sm:py-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 sm:mb-6">
              Confirmed Tours
            </h3>
            {confirmedTours.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {confirmedTours.map((tour, index) => (
                  <li key={index} className="py-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-md font-medium">{tour.name}</h3>
                      <p className="text-sm text-gray-500">{tour.school}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-700">{new Date(tour.date).toLocaleDateString()}</p>
                      {(() => {
                        const tourDate = new Date(tour.date);
                        const currentDate = new Date();

                        // Reset time to midnight for date-only comparison
                        const tourDateOnly = new Date(tourDate.setHours(0, 0, 0, 0));
                        const currentDateOnly = new Date(currentDate.setHours(0, 0, 0, 0));

                        return tourDateOnly > currentDateOnly ? (
                          <button
                            className="mt-2 bg-red-400 hover:bg-red-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                            onClick={() => {
                              const confirmBox = window.confirm(
                                `Are you sure you want to CANCEL this tour on ${tourDate.toLocaleDateString()}?`
                              );
                              if (confirmBox) {
                                handleCancel(tour.id);
                              }
                            }}
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="mt-2 text-md font-medium text-green-500">Completed</span>
                        );
                      })()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography className="text-center text-black text-md sm:text-xl">
                <strong>No confirmed tours at this time.</strong>
              </Typography>
            )}
          </div>
          <div className="border-t border-gray-200 px-2 sm:px-4 py-4 sm:py-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 sm:mb-6">
              Pending Tours
            </h3>
            {pendingTours.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {pendingTours.map((tour, index) => (
                  <li key={index} className="py-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-lg font-medium">{tour.date}</h3>
                      <p className="text-md text-green-700 font-medium">+$40</p>
                      {tour.comments && <p className="text-sm text-gray-500 break-words">"{tour.comments}"</p>}
                      <div className="text-sm text-gray-500">
                        {tour.greek_life && <p>Greek Life: Yes</p>}
                        {tour.student_athlete && <p>Student Athlete: Yes</p>}
                        {tour.paid_internship && <p>Paid Internship: Yes</p>}
                      </div>

                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-700">{new Date(tour.date).toLocaleDateString()}</p>
                      <div className="mt-2">
                        <button
                          className="bg-green-400 hover:bg-green-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline mr-1"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              `Are you sure you want to CONFIRM this tour on ${new Date(tour.date).toLocaleDateString()}? If you accept, you will be EMAILED with next steps to follow.`
                            );
                            if (confirmBox) {
                              handleConfirm(tour.id);
                            }
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-400 hover:bg-red-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              `Are you sure you want to REJECT this tour on ${new Date(tour.date).toLocaleDateString()}?`
                            );
                            if (confirmBox) {
                              handleReject(tour.id);
                            }
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography className="text-center text-black text-md sm:text-xl">
                <strong>No pending tours.</strong>
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tours;
