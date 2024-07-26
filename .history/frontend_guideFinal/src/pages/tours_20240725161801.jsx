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
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        setError(error);
        return;
      });

    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retTours", { email })
      .then(tourResponse => {
        setConfirmedTours(tourResponse.data.confirmedTours);
        setPendingTours(tourResponse.data.nonConfirmedTours);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tours data:", error);
        setLoading(false);
      });

  }, [email]);

  const handleConfirm = (id) => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/confirmTour", { id })
      .then(confResponse => {
        setConfirmedTours(prevConfirmed => [...prevConfirmed, ...pendingTours.filter(tour => tour.id === id)]);
        setPendingTours(prevPending => prevPending.filter(tour => tour.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleCancel = (id) => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/cancelTour", { id })
      .then(confResponse => {
        setConfirmedTours(prevConfirmed => prevConfirmed.filter(tour => tour.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleReject = (id) => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/declineTour", { id })
      .then(decResponse => {
        setPendingTours(prevPending => prevPending.filter(tour => tour.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/home';
  };

  if (loading) {
    return (
      <div className="bg-black text-white relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        </div>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='bg-blue-gray-700 shadow-md flex items-center p-4'>
        <Typography className='text-3xl font-semibold text-white ml-12'>
          Your Tours
        </Typography>
        <div className="lg:flex ml-auto">
          <Button
            variant="gradient"
            onClick={handleLogout}
            size="sm"
            className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            Log Out
          </Button>
        </div>
      </div>
      <div className='min-h-screen bg-gray-100'>
        <div className="p-4">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={responseData.guide.profile_image_url}
                  alt="Profile"
                  onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }}
                />
              </div>
              <div className="ml-4 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
                <div className="mt-2">
                  <Link to="/profile" className='hover:text-gray-500'>Home</Link>
                  <span className="mx-1 text-gray-400">•</span>
                  <Link to="/update-activities" className='hover:text-gray-500'>Update Activities</Link>
                  <span className="mx-1 text-gray-400">•</span>
                  <Link to="/update-hobbies" className='hover:text-gray-500'>Update Hobbies</Link>
                  <span className="mx-1 text-gray-400">•</span>
                  <Link to="/tours" className='hover:text-gray-500'>Tours</Link>
                  <span className="mx-1 text-gray-400">•</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <ul className="text-gray-700">
                <li>Email: {responseData.guide.email}</li>
                <li>Phone: {responseData.guide.phone}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Confirmed Tours
                </h3>
                {confirmedTours.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {confirmedTours.map((tour, index) => (
                      <li key={index} className="py-4 flex space-x-3">
                        <div className="flex-1 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-md font-medium">{tour.guide}</h3>
                            <p className="text-lg text-gray-700">{new Date(tour.date).toLocaleDateString()}</p>
                            {(() => {
                              const tourDate = new Date(tour.date);
                              const currentDate = new Date();

                              // Reset time to midnight for date-only comparison
                              const tourDateOnly = new Date(tourDate.setHours(0, 0, 0, 0));
                              const currentDateOnly = new Date(currentDate.setHours(0, 0, 0, 0));

                              return tourDateOnly > currentDateOnly ? (
                                <button
                                  className="bg-red-400 hover:bg-red-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline mr-1"
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
                                <h3 className="text-md font-medium">Completed</h3>
                              );
                            })()}
                          </div>
                          <p className="text-md text-gray-500">{tour.school}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography className="mb-8 text-black !text-l lg:!text-xl text-center">
                    <strong>No confirmed tours at this time.</strong>
                  </Typography>
                )}
              </div>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Pending Tours
                </h3>
                {pendingTours.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {pendingTours.map((tour, index) => (
                      <li key={index} className="py-4 flex space-x-3">
                        <div className="flex-1 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-md font-medium">{tour.guide}</h3>
                            <p className="text-lg text-gray-700">{new Date(tour.date).toLocaleDateString()}</p>
                            <p>
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
                            </p>
                          </div>
                          <p className="text-md text-gray-500">{tour.school}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography className="mb-8 text-black !text-l lg:!text-xl text-center">
                    <strong>No pending tours.</strong>
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tours;
