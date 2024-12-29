import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export function Calls() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const email = sessionStorage.username;
  const [confirmedCalls, setConfirmedCalls] = useState([]);
  const [pendingCalls, setPendingCalls] = useState([]);

  useEffect(() => {
    axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        setError(error);
        return;
      });

    axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/retCalls", { email })
      .then(callResponse => {
        setConfirmedCalls(callResponse.data.confirmedCalls);
        setPendingCalls(callResponse.data.nonConfirmedCalls);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching calls data:", error);
        setLoading(false);
      });

  }, [email]);

  const handleConfirm = async (id) => {
    try {
      axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/confirmCall", { id });
      const confirmedCall = pendingCalls.find(call => call.id === id);
      setPendingCalls(prev => prev.filter(call => call.id !== id));
      setConfirmedCalls(prev => [...prev, confirmedCall]);
      window.location.href = "/calls";
    } catch (error) {
      setError(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/cancelCall", { id });
      setConfirmedCalls(prev => prev.filter(call => call.id !== id));
      window.location.href = "/calls";
    } catch (error) {
      setError(error);
    }
  };

  const handleReject = async (id) => {
    try {
      axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/declineCall", { id });
      setPendingCalls(prev => prev.filter(call => call.id !== id));
      window.location.href = "/calls";
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
          Your Calls
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
                <Link to="/profile" className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                  Home
                </Link>
                <Link to="/update-activities" className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                  Update Activities
                </Link>
                <Link to="/update-hobbies" className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                  Update Hobbies
                </Link>
                <Link to="/tours" className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-3 rounded-md text-center'>
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
              Confirmed Calls
            </h3>
            {confirmedCalls.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {confirmedCalls.map((call, index) => (
                  <li key={index} className="py-4">
                    <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                      <div>
                        <h3 className="text-md font-medium">{call.date}</h3>
                        <p className="text-md text-gray-700">{call.name}</p>
                        <p className="text-sm text-gray-500">{call.school}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-700">{new Date(call.date).toLocaleDateString()}</p>
                        {(() => {
                          const callDate = new Date(call.date);
                          const currentDate = new Date();

                          // Reset time to midnight for date-only comparison
                          const callDateOnly = new Date(callDate.setHours(0, 0, 0, 0));
                          const currentDateOnly = new Date(currentDate.setHours(0, 0, 0, 0));

                          return callDateOnly > currentDateOnly ? (
                            <button
                              className="mt-2 bg-red-400 hover:bg-red-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                              onClick={() => {
                                const confirmBox = window.confirm(
                                  `Are you sure you want to CANCEL this call on ${callDate.toLocaleDateString()}?`
                                );
                                if (confirmBox) {
                                  handleCancel(call.id);
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
                          <DisclosureButton className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Next Steps</span>
                            {open ? (
                              <ChevronUpIcon className="w-5 h-5 text-purple-500" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-purple-500" />
                            )}
                          </DisclosureButton>
                          <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <div dangerouslySetInnerHTML={{ __html: `
                              <em>Congratulations on being selected to give a call!</em>
                              Thank you for taking on this important role. Here are your next steps 
                              to ensure a smooth and successful call experience:
                              <br><br>
                              <strong>1. Client and Call details</strong><br><br>
                              &#8226; <strong>Client name:</strong> ${call.name}<br>
                              &#8226; <strong>Client email:</strong> ${call.email}<br>
                              &#8226; <strong>Client phone:</strong> ${call.phone}<br>
                              &#8226; <strong>Call Date:</strong> ${call.date}<br>
                              &#8226; <strong>Call comments:</strong> ${call.comments || "No comments provided"}<br>
                              
                              ${call.greek_life ? `
                                <br><br>The client also requested the <strong>Greek life experience</strong> add-on package, that would pay you another $25. 
                                You would spend an extra 30 minutes helping them learn about the Greek life on campus, the rush process, and even see your respective frat or sorority house(s).
                              ` : ""}
                              
                              ${call.student_athlete ? `
                                <br><br>The client also requested the <strong>Student athlete life</strong> add-on package, that would pay you another $25. 
                                You would spend an extra 30 minutes helping them learn about the recruiting process, balancing academics and athletics, and even see athlete facilities.
                              ` : ""}
                              
                              ${call.paid_internship ? `
                                <br><br>The client also opted into the <strong>Internship insights</strong> add-on package, that would pay you another $20. 
                                You would spend an extra 30 minutes helping them learn about the internship recruitment process, how to get internships as a 
                                college student, and resume/LinkedIn review.
                              ` : ""}
                              <br>
                              <br>If they requested any additional packages, you will have to reach out manually and 
                              coordinate logistics with them.
                              <br><br>
                              <strong>2. Introduce yourself via text or email</strong><br><br>
                              This is an outline for a <strong>mandatory</strong> message you must send to ${call.name}.
                              <br>
                              &#8226; Start by sending a text to ${call.name}. Here's a script to help you:<br>
                              &#8226; <strong>Your Name:</strong> "Hi, ${call.name}, my name is __."<br>
                              &#8226; <strong>Date and School:</strong> "I'm excited to show you or your child around ${call.school} on ${call.date}."<br>
                              &#8226; <strong>Major and Interests:</strong> Share your major, any notable clubs, or activities you participate in that might interest them.<br>
                              &#8226; Coordinate timing, meeting, and special request logistics.<br>
                              &#8226; <strong>Time:</strong> See when they would prefer or can call on that date. If you cannot make ends meet for the date or any other date, email info@calledit.com and we can cancel the call.<br>
                              &#8226; <strong>Meeting Point:</strong> Suggest a convenient meeting point on campus.<br>
                              &#8226; <strong>Special Requests:</strong> Ask if there are any specific buildings or parts of 
                              campus they would like to see in particular.<br><br>
                              &#8226; <strong>Add-Ons:</strong> Again, if there are any package add-ons you will have to reach out manually to coordinate and plan how you will 
                              include them in the call.<br><br>
                              Guides receive $40 for a 60-90 minute call, and $20-25 extra per add-on. and we offer various payment methods (Venmo, Zelle, etc.). 
                              After the call, a member of our team will contact you via text or email to confirm the call and arrange payment.
                              <br><br>
                              If you have any questions, feel free to respond to this email or text 305-206-7966 for a quicker response.<br><br>
                              Thank you for your dedication and enthusiasm!
                            ` }} />
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>

                  </li>
                ))}
              </ul>
            ) : (
              <Typography className="text-center text-black text-md sm:text-xl">
                <strong>No confirmed calls at this time.</strong>
              </Typography>
            )}
          </div>
          <div className="border-t border-gray-200 px-2 sm:px-4 py-4 sm:py-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 sm:mb-6">
              Pending Calls
            </h3>
            {pendingCalls.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {pendingCalls.map((call, index) => (
                  <li key={index} className="py-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-lg font-medium">{call.date}</h3>
                      <p className="text-md text-green-700 font-medium">+$40</p>
                      {call.comments && <p className="text-sm text-gray-500 break-words">"{call.comments}"</p>}
                      

                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-700">{new Date(call.date).toLocaleDateString()}</p>
                      <div className="mt-2">
                        <button
                          className="bg-green-400 hover:bg-green-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline mr-1"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              `Are you sure you want to CONFIRM this call on ${new Date(call.date).toLocaleDateString()}? If you accept, you will be EMAILED with next steps to follow.`
                            );
                            if (confirmBox) {
                              handleConfirm(call.id);
                            }
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-400 hover:bg-red-200 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              `Are you sure you want to REJECT this call on ${new Date(call.date).toLocaleDateString()}?`
                            );
                            if (confirmBox) {
                              handleReject(call.id);
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
                <strong>No pending calls.</strong>
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calls;
