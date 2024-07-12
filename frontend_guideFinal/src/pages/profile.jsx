import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

function Profile() {
  const [postData, setPostData] = useState({
    email: ''
  });
  const [responseData, setResponseData] = useState(null); // State to hold response data
  const [error, setError] = useState(null); // State to hold error message
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      setFormSubmitted(true); // Set formSubmitted to true
      // Reset the form after successful submission
      setPostData({
        email: ''
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
            class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
            <div className='bg-blue-gray-700 rounded-lg shadow-md' >
            <Typography
           className='text-3xl font-semibold bg-blue-gray-700 text-white ml-12 p-4 '
         >Welcome {responseData.guide.name.substring(0, responseData.guide.name.indexOf(" "))}!</Typography>
            </div>
        <div className='min-h-screen'>
        <div className="bg-gray-100  p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-24 w-24 rounded-full object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80" alt="Profile" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
              <p className="text-sm text-gray-600">{responseData.guide.bio}</p>
              <div className="mt-2">
                <a href="#" className="text-blue-500 hover:underline">Stats</a>
                <span className="mx-1 text-gray-400">•</span>
                <a href="#" className="text-blue-500 hover:underline">Update Availability</a>
                <span className="mx-1 text-gray-400">•</span>
                <a href="#" className="text-blue-500 hover:underline">Update Hobbies</a>
                <span className="mx-1 text-gray-400">•</span>
                <a href="#" className="text-blue-500 hover:underline">Update Involvement</a>
                <span className="mx-1 text-gray-400">•</span>
                <a href="#" className="text-blue-500 hover:underline">Tours</a>
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
            <Typography className="text-lg font-semibold text-gray-800 mb-4">Personal Information</Typography>
            <div>
            <ul className="text-gray-700">
            <li class="flex border-y py-2">
                    <span class="font-bold w-72">Full Name:</span>
                    <span class="text-gray-700">{responseData.guide.name}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Email:</span>
                    <span class="text-gray-700">{responseData.guide.email}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">School:</span>
                    <span class="text-gray-700">{responseData.guide.school}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Hometown:</span>
                    <span class="text-gray-700">{responseData.guide.hometown}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Phone:</span>
                    <span class="text-gray-700">{responseData.guide.phone}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Bio:</span>
                    <span class="text-gray-700">{responseData.guide.bio}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Major:</span>
                    <span class="text-gray-700">{responseData.guide.major}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Secondary Major (if applicable):</span>
                    <span class="text-gray-700">{responseData.guide.secondary_major}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Minor (if applicable):</span>
                    <span class="text-gray-700">{responseData.guide.minor}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Secondary Minor (if applicable):</span>
                    <span class="text-gray-700">{responseData.guide.secondary_minor}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">Instagram:</span>
                    <span class="text-gray-700">{responseData.guide.instagram}</span>
              </li>
              <li class="flex border-y py-2">
                    <span class="font-bold w-72">LinkedIn:</span>
                    <span class="text-gray-700">{responseData.guide.linkedin}</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">

          <div className="mt-2">
          <Typography className="text-lg font-semibold text-gray-800 mb-4">Hobbies</Typography>
          </div>
          <ul className="text-gray-700">
                {responseData.guide.hobbies.map((props, key) => (
                    <li class="flex border-y py-2">
                        <span class="font-bold w-72">Email:</span>
                        <span class="text-gray-700">{responseData.guide.hobbies}</span>
                    </li>
                ))}
              
            </ul>
        </div>
      </div>
      <div className="bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">

          <div className="mt-2">
          <Typography className="text-lg font-semibold text-gray-800 mb-4">Campus Involvement</Typography>
          </div>
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

export default Profile;
