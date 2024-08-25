import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

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
      axios.post("http://localhost:3000/api/confirmTour", { id });
      const confirmedTour = pendingTours.find(tour => tour.id === id);
      setPendingTours(prev => prev.filter(tour => tour.id !== id));
      setConfirmedTours(prev => [...prev, confirmedTour]);
      window.location.href = "/tours";
    } catch (error) {
      setError(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      axios.post("http://localhost:3000/api/cancelTour", { id });
      setConfirmedTours(prev => prev.filter(tour => tour.id !== id));
      window.location.href = "/tours";
    } catch (error) {
      setError(error);
    }
  };

  const handleReject = async (id) => {
    try {
      axios.post("http://localhost:3000/api/declineTour", { id });
      setPendingTours(prev => prev.filter(tour => tour.id !== id));
      window.location.href = "/tours";
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
                <Link to="/profile" className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                  Home
                </Link>
                <Link to="/update-activities" className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                  Update Activities
                </Link>
                <Link to="/update-hobbies" className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                  Update Hobbies
                </Link>
                <Link to="/tours" className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded-md text-center'>
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
                  <li key={index} className="py-4">
                    <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                      <div>
                        <h3 className="text-md font-medium">{tour.date}</h3>
                        <p className="text-md text-gray-700">{tour.name}</p>
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
                    </div>

                    {/* Expandable Section */}
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Next Steps</span>
                            {open ? (
                              <ChevronUpIcon className="w-5 h-5 text-purple-500" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-purple-500" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <div dangerouslySetInnerHTML={{ __html: `
                              <em>Congratulations on being selected to give a tour!</em>
                              Thank you for taking on this important role. Here are your next steps 
                              to ensure a smooth and successful tour experience:
                              <br><br>
                              <strong>1. Client and Tour details</strong><br><br>
                              &#8226; <strong>Client name:</strong> ${tour.name}<br>
                              &#8226; <strong>Client email:</strong> ${tour.email}<br>
                              &#8226; <strong>Client phone:</strong> ${tour.phone}<br>
                              &#8226; <strong>Tour Date:</strong> ${tour.date}<br>
                              &#8226; <strong>Tour comments:</strong> ${tour.comments || "No comments provided"}<br>
                              
                              ${tour.greek_life ? `
                                <br><br>The client also requested the <strong>Greek life experience</strong> add-on package, that would pay you another $25. 
                                You would spend an extra 30 minutes helping them learn about the Greek life on campus, the rush process, and even see your respective frat or sorority house(s).
                              ` : ""}
                              
                              ${tour.student_athlete ? `
                                <br><br>The client also requested the <strong>Student athlete life</strong> add-on package, that would pay you another $25. 
                                You would spend an extra 30 minutes helping them learn about the recruiting process, balancing academics and athletics, and even see athlete facilities.
                              ` : ""}
                              
                              ${tour.paid_internship ? `
                                <br><br>The client also opted into the <strong>Internship insights</strong> add-on package, that would pay you another $20. 
                                You would spend an extra 30 minutes helping them learn about the internship recruitment process, how to get internships as a 
                                college student, and resume/LinkedIn review. <strong></strong>
                              ` : ""}
                              <br>
                              <br>If they requested any additional packages, you will have to reach out manually and 
                              coordinate logistics with them.
                              <br><br>
                              <strong>2. Introduce yourself via text or email</strong><br><br>
                              This is an outline for a <strong>mandatory</strong> message you must send to ${tour.name}.
                              <br>
                              &#8226; Start by sending a text to ${tour.name}. Here's a script to help you:<br>
                              &#8226; <strong>Your Name:</strong> "Hi, ${tour.name}, my name is __."<br>
                              &#8226; <strong>Date and School:</strong> "I'm excited to show you or your child around ${tour.school} on ${tour.date}."<br>
                              &#8226; <strong>Major and Interests:</strong> Share your major, any notable clubs, or activities you participate in that might interest them.<br>
                              &#8226; Coordinate timing, meeting, and special request logistics.<br>
                              &#8226; <strong>Time:</strong> See when they would prefer or can tour on that date. If you cannot make ends meet for the date or any other date, email info@touredit.com and we can cancel the tour.<br>
                              &#8226; <strong>Meeting Point:</strong> Suggest a convenient meeting point on campus.<br>
                              &#8226; <strong>Special Requests:</strong> Ask if there are any specific buildings or parts of 
                              campus they would like to see in particular.<br><br>
                              &#8226; <strong>Add-Ons:</strong> Again, if there are any package add-ons you will have to reach out manually to coordinate and plan how you will 
                              include them in the tour.<br><br>
                              Guides receive $40 for a 60-90 minute tour, and $20-25 extra per add-on. and we offer various payment methods (Venmo, Zelle, etc.). 
                              After the tour, a member of our team will contact you via text or email to confirm the tour and arrange payment.
                              <br><br>
                              If you have any questions, feel free to respond to this email or text 305-206-7966 for a quicker response.<br><br>
                              Thank you for your dedication and enthusiasm!
                            ` }} />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

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
                        {tour.greek_life && <div className='flex'><p>Greek Life Add-on</p> <p className='ml-2 text-md font-medium text-green-700'>+$25</p></div>}
                        {tour.student_athlete && <div className='flex'><p>Student-Athlete Add-on</p> <p className='ml-2 text-md font-medium text-green-700'>+$25</p></div>}
                        {tour.paid_internship && <div className='flex'><p>Paid Internship Add-on</p> <p className='ml-2 text-md font-medium text-green-700'>+$20</p></div>}
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
