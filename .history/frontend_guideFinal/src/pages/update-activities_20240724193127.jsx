import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function UpdateActivities() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const email = sessionStorage.username;

  const [activityData, setActivityData] = useState({
    email: '',
    activity_name: '',
    description: ''
  });

  useEffect(() => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        setActivityData(prevState => ({
          ...prevState,
          email: response.data.guide.email
        }));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [email]);

  const [activityResponseData, setActivityResponseData] = useState(null); // State to hold response data

  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/newActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setActivityResponseData(data); // Store response data in state
      setError(null); // Clear any previous errors

      // Reset the form after successful submission
      setActivityData({
        email: '',
        activity_name: '',
        description: ''
      });

      // Refresh activities
      const refreshResponse = await axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email });
      setResponseData(refreshResponse.data);
    } catch (error) {
      setError('Error posting data: ' + error.message); // Store error message in state
      setResponseData(null); // Clear response data
    }
  };

  const deleteActivity = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        const response = await axios.post('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/remInvolvement', { id });
        if (response.status === 201) {
          // Successfully deleted
          setResponseData(prevState => ({
            ...prevState,
            guide: {
              ...prevState.guide,
              activities: prevState.guide.activities.filter(activity => activity.activity_id !== id)
            }
          }));
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
          Update Activities
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
                <div className="mt-2">
                  <Link to="/profile" className='hover:text-gray-500'>Home</Link>
                  <span className="mx-1 text-gray-400">•</span>
                  <Link to="/update-activities" className='hover:text-gray-500'>Update Activities</Link>
                  <span className="mx-1 text-gray-400">•</span>
                  <Link to="/update-hobbies" className='hover:text-gray-500'>Update Hobbies</Link>
                  <span className="mx-1 text-gray-400">•</span>
                  <Link to="/tours" className='hover:text-gray-500'>Tours</Link>
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
                  <span className="font-bold w-full sm:w-1/4">Activities</span>
                  <span className="font-bold w-full sm:w-1/4">Name</span>
                  <span className="font-bold w-full sm:w-1/4">Description</span>
                </div>
              </Typography>
            </div>
            <ul className="text-gray-700">
              {responseData.guide.activities && responseData.guide.activities.length > 0 ? (
                responseData.guide.activities.map((activity, key) => (
                  <li key={key} className="border-y py-2">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                    <span className="font-bold">Activity:</span>
                    <span className="text-gray-700 ml-2">{activity.activity_name}</span>
                  </div>
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                    <span className="font-bold">Name:</span>
                    <span className="text-gray-700 ml-2">{activity.activity_name}</span>
                  </div>
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                    <span className="font-bold">Description:</span>
                    <span className="text-gray-700 ml-2 block truncate" title={activity.description}>{activity.description}</span>
                  </div>
                  <div className="w-full sm:w-auto sm:ml-4">
                    <button
                      onClick={() => deleteActivity(activity.activity_id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
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
            <form onSubmit={addActivity}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="activity_name">
                    Activity Name:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="activity_name"
                    type="text"
                    placeholder="Name"
                    value={activityData.activity_name}
                    onChange={handleActivityChange}
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
                    value={activityData.description}
                    onChange={handleActivityChange}
                    required>
                  </textarea>
                </div>
              </div>
              <div className="w-full px-3 flex justify-center mx-auto">
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add activity
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateActivities;
