import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function UpdateHobbies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const email = sessionStorage.username;

  const [hobbyData, setHobbyData] = useState({
    email: '',
    hobby_name: '',
    description: ''
  });

  useEffect(() => {
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        const newImageUrl = `https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/images/${response.data.guide.profile_image_url}`;
        setImageUrl(newImageUrl);
        setHobbyData(prevState => ({ ...prevState, email: response.data.guide.email }));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [email]);

  // For adding hobbies
  const [hobbyResponseData, setHobbyResponseData] = useState(null); // State to hold response data

  const handleHobbyChange = (e) => {
    const { name, value } = e.target;
    setHobbyData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addHobby = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/newHobby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hobbyData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setHobbyResponseData(data); // Store response data in state
      setError(null); // Clear any previous errors

      // Reset the form after successful submission
      setHobbyData({
        email: responseData.guide.email,
        hobby_name: '',
        description: ''
      });

      // Fetch updated guide info
      const updatedResponse = await axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email });
      setResponseData(updatedResponse.data);
    } catch (error) {
      setError('Error posting data: ' + error.message); // Store error message in state
      setHobbyResponseData(null); // Clear response data
    }
  };

  // For deleting hobbies
  const deleteHobby = async (hobbyId) => {
    try {
      const response = await fetch('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/remHobby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hobby_id: hobbyId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setHobbyResponseData(data); // Store response data in state
      setError(null); // Clear any previous errors

      // Fetch updated guide info
      const updatedResponse = await axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email });
      setResponseData(updatedResponse.data);
    } catch (error) {
      setError('Error deleting data: ' + error.message); // Store error message in state
      setHobbyResponseData(null); // Clear response data
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/home';
  };

  if (loading) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-gray-700 shadow-md flex items-center p-4">
        <Typography className="text-3xl font-semibold text-white ml-12">Update Hobbies</Typography>
        <div className="ml-auto">
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
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0">
              {imageUrl && <img className="h-24 w-24 rounded-full" src={imageUrl} alt="Profile" />}
            </div>
            <div className="ml-4 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
              <div className="mt-2">
                <Link to="/profile" className="hover:text-gray-500">Home</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/update-activities" className="hover:text-gray-500">Update Activities</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/update-hobbies" className="hover:text-gray-500">Update Hobbies</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/tours" className="hover:text-gray-500">Tours</Link>
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
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
          <Typography className="text-lg font-semibold text-gray-700 mb-4">
            Hobbies
          </Typography>
          <ul className="text-gray-700">
            {responseData.guide.hobbies.map((hobby, key) => (
              <li key={key} className="flex flex-wrap border-y py-2 items-center">
                <span className="font-bold w-full md:w-1/4">Hobby:</span>
                <span className="text-gray-700 w-full md:w-1/4">{hobby.hobby_name}</span>
                <span className="text-gray-700 w-full md:w-1/4">{hobby.description}</span>
                <span className="w-full md:w-1/4 text-right">
                  <button
                    className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                    value={hobby.hobby_id}
                    onClick={() => deleteHobby(hobby.hobby_id)}
                  >
                    Delete hobby
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <Typography className="text-lg font-semibold text-gray-700 mb-4">
            Add new hobbies
          </Typography>
          <form name="hobby-form" onSubmit={addHobby}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hobby_name">
                  Hobby Name:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name="hobby_name"
                  type="text"
                  placeholder="Name"
                  value={hobbyData.hobby_name}
                  onChange={handleHobbyChange}
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
                  value={hobbyData.description}
                  onChange={handleHobbyChange}
                  required
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 flex justify-center mx-auto">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add hobby
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateHobbies;
