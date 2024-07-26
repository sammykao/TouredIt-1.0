import React, { useState, useEffect } from 'react';
import { Typography, Button, Input } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import majors from './majors.json'; // Make sure this path is correct

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEditSave = async () => {
    if (selectedFile) {
      try {
        const result = await postImage({ image: selectedFile });
        setFormData({
          ...formData,
          profile_image_url: result.imagePath
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/updateGuide", formData)
      .then(response => {
        setResponseData({ guide: formData });
        setIsEditing(false);
      })
      .catch(error => {
        console.error("Error updating guide:", error);
      });
  };

  const renderMajorOptions = () => {
    const sortedMajors = Object.values(majors).flat().sort();
    return sortedMajors.map(major => (
      <option key={major} value={major}>{major}</option>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className='bg-blue-gray-700 shadow-md flex items-center p-4'>
        <Typography className='text-3xl font-semibold text-white ml-12'>
          Welcome {responseData.guide.name.split(" ")[0]}!
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
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <Typography className="text-2xl font-bold text-gray-800">Profile Information</Typography>
            <Button variant="gradient" onClick={() => setIsEditing(!isEditing)} size="sm" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                className="h-48 w-48 rounded-full object-cover mx-auto" 
                src={formData.profile_image_url} 
                alt="Profile" 
                onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }} 
              />
              {isEditing && (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-4"
                />
              )}
            </div>
            <div>
              <Typography className="font-bold">Name:</Typography>
              {isEditing ? (
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <Typography>{formData.name}</Typography>
              )}
              <Typography className="font-bold mt-2">Email:</Typography>
              <Typography>{formData.email}</Typography>
              <Typography className="font-bold mt-2">Phone:</Typography>
              {isEditing ? (
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <Typography>{formData.phone}</Typography>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Typography className="font-bold">Bio:</Typography>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="4"
              />
            ) : (
              <Typography>{formData.bio}</Typography>
            )}
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography className="font-bold">Major:</Typography>
              {isEditing ? (
                <select
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a major</option>
                  {renderMajorOptions()}
                </select>
              ) : (
                <Typography>{formData.major}</Typography>
              )}
            </div>
            <div>
              <Typography className="font-bold">Minor:</Typography>
              {isEditing ? (
                <select
                  name="minor"
                  value={formData.minor}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Choose Minor</option>
                  {renderMajorOptions()}
                </select>
              ) : (
                <Typography>{formData.minor}</Typography>
              )}
            </div>
            <div>
              <Typography className="font-bold">Secondary Major:</Typography>
              {isEditing ? (
                <select
                  name="secondary_major"
                  value={formData.secondary_major}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Choose Second Major</option>
                  {renderMajorOptions()}
                </select>
              ) : (
                <Typography>{formData.secondary_major}</Typography>
              )}
            </div>
            <div>
              <Typography className="font-bold">Secondary Minor:</Typography>
              {isEditing ? (
                <select
                  name="secondary_minor"
                  value={formData.secondary_minor}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Second Minor</option>
                  {renderMajorOptions()}
                </select>
              ) : (
                <Typography>{formData.secondary_minor}</Typography>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="mt-6">
              <Button variant="gradient" onClick={handleEditSave} size="sm" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;