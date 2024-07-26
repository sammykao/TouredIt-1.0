import React, { useState, useEffect } from 'react';
import { Typography, Button, Input } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import majors from './majors.json';

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
    let updatedFormData = { ...formData };

    if (selectedFile) {
      const fileFormData = new FormData();
      fileFormData.append('image', selectedFile);
      try {
        const uploadResponse = await axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/images", fileFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(uploadResponse.data);
        updatedFormData = {
          ...updatedFormData,
          profile_image_url: uploadResponse.data.imagePath
        };
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/updateGuide", updatedFormData)
      .then(response => {
        setResponseData({ guide: updatedFormData });
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
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <Typography className="text-red-500">Error: {error.message}</Typography>
      </div>
    );
  }

  return (
    <div>
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
        <div className='min-h-screen'>
          <div className="bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img 
                    className="h-24 w-24 rounded-full object-cover" 
                    src={responseData.guide.profile_image_url} 
                    alt="Profile" 
                    onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }} 
                  />
                </div>
                <div className="ml-4">
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
              <div className="flex justify-between items-center">
                <Typography className="text-lg font-semibold text-gray-800 mb-4">Personal Information</Typography>
                <Button variant="gradient" onClick={() => setIsEditing(!isEditing)} size="sm" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              <div>
                <ul className="text-gray-700">
                  {isEditing ? (
                    <>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Full Name:</span>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Email:</span>
                        <span className="text-gray-700 flex-1">{responseData.guide.email}</span>
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">School:</span>
                        <span className="text-gray-700 flex-1">{responseData.guide.school}</span>
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Hometown:</span>
                        <Input
                          type="text"
                          name="hometown"
                          value={formData.hometown || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Phone:</span>
                        <Input
                          type="text"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Bio:</span>
                        <Input
                          type="text"
                          name="bio"
                          value={formData.bio || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Upload New Profile Image:</span>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Major:</span>
                        <select
                          name="major"
                          value={formData.major || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white"
                        >
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Secondary Major:</span>
                        <select
                          name="secondary_major"
                          value={formData.secondary_major || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white"
                        >
                          <option value="">None</option>
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Minor:</span>
                        <select
                          name="minor"
                          value={formData.minor || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white"
                        >
                          <option value="">None</option>
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Secondary Minor:</span>
                        <select
                          name="secondary_minor"
                          value={formData.secondary_minor || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white"
                        >
                          <option value="">None</option>
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">Instagram:</span>
                        <Input
                          type="text"
                          name="instagram"
                          value={formData.instagram || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                      <li className="flex border-y py-2 items-center">
                        <span className="font-bold w-72">LinkedIn:</span>
                        <Input
                          type="text"
                          name="linkedin"
                          value={formData.linkedin || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1"
                        />
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Full Name:</span>
                        <span className="text-gray-700">{responseData.guide.name}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Email:</span>
                        <span className="text-gray-700">{responseData.guide.email}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">School:</span>
                        <span className="text-gray-700">{responseData.guide.school}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Hometown:</span>
                        <span className="text-gray-700">{responseData.guide.hometown}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Phone:</span>
                        <span className="text-gray-700">{responseData.guide.phone}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Bio:</span>
                        <span className="text-gray-700">{responseData.guide.bio}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Major:</span>
                        <span className="text-gray-700">{responseData.guide.major}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Secondary Major:</span>
                        <span className="text-gray-700">{responseData.guide.secondary_major}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Minor:</span>
                        <span className="text-gray-700">{responseData.guide.minor}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Secondary Minor:</span>
                        <span className="text-gray-700">{responseData.guide.secondary_minor}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">Instagram:</span>
                        <span className="text-gray-700">{responseData.guide.instagram}</span>
                      </li>
                      <li className="flex border-y py-2">
                        <span className="font-bold w-72">LinkedIn:</span>
                        <span className="text-gray-700">{responseData.guide.linkedin}</span>
                      </li>
                    </>
                  )}
                </ul>
                {isEditing && (
                  <div className="flex justify-end mt-4">
                    <Button variant="gradient" onClick={handleEditSave} size="sm" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
