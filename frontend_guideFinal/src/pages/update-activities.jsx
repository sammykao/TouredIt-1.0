import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

function UpdateActivities() {
  const [postData, setPostData] = useState({
    email: ''
  });
  const [activityData, setActivityData] = useState({
    tourguide_id:'',
    activity_name: '',
    description: ''
  });

  const [responseData, setResponseData] = useState(null); // State to hold response data
  const [error, setError] = useState(null); // State to hold error message
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  // For pulling acount data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/retGuideInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data); // Store response data in state
      setError(null); // Clear any previous errors
      const newImageUrl = `http://localhost:3001/images/${data.guide.profile_image_url}`;
      setImageUrl(newImageUrl);
      setFormSubmitted(true); // Set formSubmitted to true
      // Reset the form after successful submission
      setPostData({
        email: data.guide.email
      });
      setActivityData({
        tourguide_id: data.guide.id,
        activity_name: '',
        description: ''
      })
    } catch (error) {
      setError('Error posting data: ' + error.message); // Store error message in state
      setResponseData(null); // Clear response data
    }
  };



  // For adding hobbies
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
      const response = await fetch('http://localhost:3001/api/newActivity', {
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

      console.log(activityData);

      // Reset the form after successful submission
      setActivityData({
        tourguide_id: postData.guide.id,
        activity_name: '',
        description: ''
      });
    } catch (error) {
      setError('Error posting data: ' + error.message); // Store error message in state
      setResponseData(null); // Clear response data
    }

    try {
      const response = await fetch('http://localhost:3001/api/retGuideInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data); // Store response data in state
      setError(null); // Clear any previous errors
      const newImageUrl = `http://localhost:3001/images/${data.guide.profile_image_url}`;
      setImageUrl(newImageUrl);
      setFormSubmitted(true); // Set formSubmitted to true
      // Reset the form after successful submission
      setPostData({
        email: data.guide.email
      });
    } catch (error) {
      setError('Error posting data: ' + error.message); // Store error message in state
      setResponseData(null); // Clear response data
    }

  };

  return (
    <div>
         {!formSubmitted ? (
        <div className='max-w-xl mx-auto my-auto bg-white p-8 rounded shadow-lg'>
      <Typography
      className='text-xl font-semibold'
      >Welcome, please login below</Typography>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>
          <Typography
          className='text-lg'
          >Email:</Typography>
          <input
            type="text"
            name="email"
            placeholder='name@mail.com'
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            value={postData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button 
            type="submit"
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Submit</button>
      </form>
      </div>

        ) :(
            <div> 
      {error && <p>{error}</p>}

      {responseData && (
        <div>
            <div className='bg-blue-gray-700 shadow-md' >
            <Typography
           className='text-3xl font-semibold bg-blue-gray-700 text-white ml-12 p-4 '
         >Update Activities</Typography>
            </div>
        <div className='min-h-screen'>
        <div className="bg-gray-100  p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-24 w-24 rounded-full object-cover" src={imageUrl} alt="Profile" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
              <div className="mt-2">
                <Link to="/profile"className='hover:text-gray-500' >Home</Link>
                <span className="mx-1 text-gray-400" >•</span>
                <Link to="/profile" className='hover:text-gray-500' >Update Availability</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/update-activities" className='hover:text-gray-500' >Update Activities</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/update-hobbies" className='hover:text-gray-500' >Update hobbies</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/profile" className='hover:text-gray-500' >Tours</Link>
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

        <div className="mt-2">
          <Typography className="text-lg font-semibold text-gray-700 mb-4">
          <li className="flex py-2">
            <span className="font-bold w-72">Activities</span>
            <span className="font-bold w-72">Name</span>
            <span className="font-bold w-72">Description</span>
            </li></Typography>
          </div>
          <ul className="text-gray-700">
                {responseData.guide.activities.map((activity, key) => (
                    <li className="flex border-y py-2">
                        <span className="font-bold w-72">Activity:</span>
                        <span className="text-gray-700 w-72">{activity.activity_name}</span>
                        <span className="text-gray-700 mr-44">{activity.description}</span>
                    </li>
                ))}
              
            </ul>
            <Typography className="text-lg font-semibold text-gray-700 mb-4 mt-4">
            <li className="flex py-2">
            <span className="font-bold w-72">Add new hobbies</span>
            </li></Typography>
            <form onSubmit={addActivity}>
            
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="secondary_major">
                  Activity Name:
                </label>
                <input 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    name="activity_name" 
                    type="text" 
                    placeholder="Name"
                    value={activityData.activity_name}
                    onChange={handleActivityChange}
                    />
              </div>
              <div class="w-full md:w-2/3 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="secondary_minor">
                  Description:
                </label>
                <textarea 
                  cols="40" 
                  rows="3" 
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  name="description" 
                  type="text" 
                  placeholder="~50 words maximum"
                  value={activityData.description}
                  onChange={handleActivityChange}
                  required>

              </textarea>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-3 flex justify-center mx-auto">
            <button 
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Add activity</button>
            </div>
            </form>

            
        </div>
      </div>
      
      </div>
      </div>
      )}
      </div>
      )} 
    </div>





  );
}

export default UpdateActivities;