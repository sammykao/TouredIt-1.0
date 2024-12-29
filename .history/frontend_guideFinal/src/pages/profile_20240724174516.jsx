import React, { useState, useEffect } from 'react';
import { Typography, Button, Input } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const email = sessionStorage.username;

  useEffect(() => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        setFormData(response.data.guide);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        return;
      });
  }, [email]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/home';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditSave = () => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/updateGuide", formData)
      .then(response => {
        setResponseData(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("Error updating guide:", error);
      });
  };

  if (loading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="absolute m-0 h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
        <Typography className="text-red-500">Error: {error.message}</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='bg-blue-gray-700 shadow-md flex items-center p-4'>
        <Typography className='text-3xl font-semibold text-white ml-4 sm:ml-12'>
          Welcome {responseData.guide.name.split(" ")[0]}!
        </Typography>
        <div className="ml-auto mr-4 sm:mr-12">
          <Button variant="gradient" onClick={handleLogout} size="sm" className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-3xl">
            Log Out
          </Button>
        </div>
      </div>
      <div className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={responseData.guide.profile_image_url}
                alt="Profile"
                onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }}
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
              <div className="mt-2 flex flex-wrap space-x-2 text-center sm:text-left">
                <Link to="/profile" className='hover:text-gray-500'>Home</Link>
                <span className="text-gray-400">•</span>
                <Link to="/update-activities" className='hover:text-gray-500'>Update Activities</Link>
                <span className="text-gray-400">•</span>
                <Link to="/update-hobbies" className='hover:text-gray-500'>Update Hobbies</Link>
                <span className="text-gray-400">•</span>
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
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8 mt-4">
          <div className="flex justify-between items-center">
            <Typography className="text-lg font-semibold text-gray-800 mb-4">Personal Information</Typography>
            <Button variant="gradient" onClick={() => setIsEditing(!isEditing)} size="sm" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          <div>
            <ul className="text-gray-700">
              {Object.keys(formData).map((key) => (
                key !== 'school' && key !== 'email' ? (
                  <li key={key} className="flex border-y py-2 items-center">
                    <span className="font-bold w-48 capitalize">{key.replace(/_/g, ' ')}:</span>
                    {isEditing ? (
                      <Input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="text-gray-700 flex-1"
                      />
                    ) : (
                      <span className="text-gray-700 flex-1">{responseData.guide[key]}</span>
                    )}
                  </li>
                ) : null
              ))}
            </ul>
            {isEditing && (
              <div className="flex justify-end mt-4">
                <Button variant="gradient" onClick={handleEditSave} size="sm" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
