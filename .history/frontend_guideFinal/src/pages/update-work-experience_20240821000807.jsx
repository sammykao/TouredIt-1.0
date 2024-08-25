import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function UpdateWorkExperience() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const email = sessionStorage.username;

  const [expData, setExpData] = useState({
    email: '',
    job_name: '',
    description: ''
  });

  const [refresh, setRefresh] = useState(false); // State to trigger data refresh

  useEffect(() => {
    axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        setExpData(prevState => ({
          ...prevState,
          email: response.data.guide.email
        }));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [email, refresh]); // Adding refresh to dependencies

  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setExpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addExp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/newWorkExp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setExpData({
        email: responseData.guide.email,
        job_name: '',
        description: ''
      });

      setRefresh(!refresh); // Trigger data refresh

    } catch (error) {
      setError('Error posting data: ' + error.message); // Store error message in state
    }
  };

  const deleteExp = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/remWorkExp', { id });
        if (response.status === 200 || response.status === 201) {
          const updatedExp = responseData.guide.work_experience.filter(exp => exp.job_id !== id);
          // Update the responseData state to reflect the deletion
          setResponseData(prevState => ({
              ...prevState,
              guide: {
                  ...prevState.guide,
                  work_experience: updatedExp
              }
          })); // Trigger data refresh
        }

      } catch (error) {
        setError('Error deleting activity: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/home';
  };

  if (loading) {
    return (
      <div className="relative flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div className="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true"></div>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-0 p-0 clip-[rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='bg-blue-gray-700 shadow-md flex items-center p-4'>
        <Typography className='text-3xl font-semibold text-white ml-4 md:ml-12'>
          Update Work Experience
        </Typography>
        <div className="flex ml-auto">
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
      <div className='min-h-screen'>
        <div className="bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              <div className="flex-shrink-0">
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={responseData.guide.profile_image_url}
                  alt="Profile"
                  onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
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
            <div className="mt-2 hidden sm:block">
              <Typography className="text-lg font-semibold text-gray-700 mb-4">
                <div className="flex py-2">
                  <span className="font-bold w-full sm:w-1/4">Name</span>
                  <span className="font-bold w-full sm:w-1/4">Description</span>
                </div>
              </Typography>
            </div>
            <ul className="text-gray-700">
              {responseData.guide.work_experience[0]?.job_name ? (
                responseData.guide.work_experience.map((exp, key) => (
                  <li key={key} className="border-y py-2">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                        <span className="font-bold sm:hidden">Name:</span>
                        <span className="text-gray-700 ml-1">{exp.job_name}</span>
                      </div>
                      <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                        <span className="font-bold sm:hidden">Description:</span>
                        <span className="text-gray-700 ml-1 block truncate">{exp.description}</span>
                      </div>
                      <div className="w-full sm:w-auto">
                        <button
                          onClick={() => deleteExp(exp.job_id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold sm:ml-4 py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-700">No activities found.</li>
              )}
            </ul>

            <Typography className="text-lg font-semibold text-gray-700 mb-4 mt-4">
              <li className="flex py-2">
                <span className="font-bold w-72">Add new activities</span>
              </li>
            </Typography>
            <form onSubmit={addExp}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="activity_name">
                    Experience Name:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="job_name"
                    type="text"
                    placeholder="Name"
                    value={expData.job_name}
                    onChange={handleExpChange}
                  />
                </div>
                <div className="w-full md:w-2/3 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    cols="40"
                    rows="3"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="description"
                    type="text"
                    placeholder="~50 words maximum"
                    value={expData.description}
                    onChange={handleExpChange}
                    required>
                  </textarea>
                </div>
              </div>
              <div className="w-full px-3 flex justify-center mx-auto">
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateWorkExperience;
