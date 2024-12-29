import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, Checkbox, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import majors from './majors.json';
import grad_years from './grad_years.json';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import imageCompression from 'browser-image-compression';

async function compressImage(file) {
  const options = {
    maxSizeMB: 1,            // Target size in MB
    maxWidthOrHeight: 1920,  // Target dimensions
    useWebWorker: true
  };
  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Compression error:', error);
  }
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
    axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/retGuideInfo", { email })
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
    const file = e.target.files[0];
    const validFileTypes = ['image/jpeg', 'image/png']; 
    if (file && !validFileTypes.includes(file.type)) {
      alert('Only JPEG, JPG, and PNG files are allowed.');
      e.target.value = ''; 
      return;
    }
    setSelectedFile(file);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleEditSave = async () => {
    let updatedFormData = { ...formData };

    if (selectedFile) {
      const compressedImg = await compressImage(selectedFile);
      const fileFormData = new FormData();
      const uniqueName = `${Date.now()}_${compressedImg.name}`;
      fileFormData.append("image", compressedImg, uniqueName);
      
      try {
        const uploadResponse = await axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/images", fileFormData);
        updatedFormData = {
          ...updatedFormData,
          profile_image_url: uploadResponse.data.imagePath
        };
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    if (!formData.grad_year) {
      alert('Please select a graduation year.');
      return; // Exit the function if grad_year is not selected
    }

    axios.post("https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/updateGuide", updatedFormData)
      .then(response => {
        setResponseData({ guide: updatedFormData });
        setIsEditing(false);
      })
      .catch(error => {
        console.error("Error updating guide:", error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  const renderMajorOptions = () => {
    const sortedMajors = Object.values(majors).flat().sort();
    return sortedMajors.map(major => (
      <option key={major} value={major}>{major}</option>
    ));
  };

  const renderGradYearOptions = () => {
    return grad_years.grad_years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
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
        <div className='bg-blue-gray-700 shadow-md flex flex-col sm:flex-row items-center p-4'>
          <Typography className='text-2xl sm:text-3xl font-semibold text-white text-center sm:text-left sm:ml-12'>
            Welcome {responseData.guide.name.split(" ")[0]}!
          </Typography>
          <div className="mt-2 sm:mt-0 sm:ml-auto">
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
        <div className='min-h-screen'>
          <div className="bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img 
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover" 
                    src={responseData.guide.profile_image_url} 
                    alt="Profile" 
                    onError={(e) => { e.target.src = './../../public/img/temp_profile_pic.png'; }} 
                  />
                </div>
                <div className="sm:ml-4 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
                  <div className="mt-2 flex flex-col sm:flex-row sm:space-x-2">
                    <Link to="/profile" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                      Home
                    </Link>
                    <Link to="/update-activities" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                      Update Activities
                    </Link>
                    <Link to="/update-hobbies" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                      Update Hobbies
                    </Link>
                    <Link to="/tours" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-center mb-2 sm:mb-0'>
                      Tours
                    </Link>
                    <Link to="/calls" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-center'>
                      Calls
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center sm:text-left">Contact Information</h2>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex flex-col sm:flex-row">
                    <span className="font-bold w-72">Email:</span>
                    <span className="text-gray-700">{responseData.guide.email}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row">
                    <span className="font-bold w-72">Phone:</span>
                    <span className="text-gray-700">{responseData.guide.phone}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
              <div className="flex justify-between items-center">
                <Typography className="text-lg font-semibold text-gray-800 mb-4 text-center sm:text-left">Personal Information</Typography>
                <Button variant="gradient" onClick={() => setIsEditing(!isEditing)} size="sm" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              <div>
                <ul className="text-gray-700 space-y-4">
                  {isEditing ? (
                    <>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Full Name:</span>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Email:</span>
                        <span className="text-gray-700 flex-1 mt-2 sm:mt-0">{responseData.guide.email}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">School:</span>
                        <span className="text-gray-700 flex-1 mt-2 sm:mt-0">{responseData.guide.school}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Hometown:</span>
                        <Input
                          type="text"
                          name="hometown"
                          value={formData.hometown || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Phone:</span>
                        <Input
                          type="text"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Bio:</span>
                        <Textarea
                          name="bio"
                          value={formData.bio || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                          rows={3}
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Upload New Profile Image:</span>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Major:</span>
                        <select
                          name="major"
                          value={formData.major || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-2 px-4 mt-2 sm:mt-0 leading-tight focus:outline-none focus:bg-white"
                          required
                        >
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Secondary Major:</span>
                        <select
                          name="secondary_major"
                          value={formData.secondary_major || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-2 px-4 mt-2 sm:mt-0 leading-tight focus:outline-none focus:bg-white"
                        >
                          <option value="">None</option>
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Minor:</span>
                        <select
                          name="minor"
                          value={formData.minor || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-2 px-4 mt-2 sm:mt-0 leading-tight focus:outline-none focus:bg-white"
                        >
                          <option value="">None</option>
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Secondary Minor:</span>
                        <select
                          name="secondary_minor"
                          value={formData.secondary_minor || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full border rounded py-2 px-4 mt-2 sm:mt-0 leading-tight focus:outline-none focus:bg-white"
                        >
                          <option value="">None</option>
                          {renderMajorOptions()}
                        </select>
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Instagram:</span>
                        <Input
                          type="text"
                          name="instagram"
                          value={formData.instagram || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">LinkedIn:</span>
                        <Input
                          type="text"
                          name="linkedin"
                          value={formData.linkedin || ""}
                          onChange={handleInputChange}
                          className="text-gray-700 flex-1 mt-2 sm:mt-0"
                        />
                      </li>
                      <li className="flex flex-col sm:flex-row items-center">
                        <span className="font-bold w-full sm:w-72">Graduation Year:</span>
                        <select
                          name="grad_year"
                          value={formData.grad_year || ""}
                          onChange={handleInputChange}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mt-2 sm:mt-0 leading-tight focus:outline-none focus:bg-white"
                          required
                        >
                          <option value="">Graduation Year</option>
                          {renderGradYearOptions()}
                        </select>
                      </li>
                      <li>
                      <div className="flex flex-wrap -mx-3 mb-6">

                        <div className="w-full px-3 mb-6">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <DisclosureButton className="flex justify-between w-full text-left">
                                  <Checkbox
                                    name="greek_life"
                                    label="Greek Life"
                                    checked={formData.greek_life}
                                    onChange={handleCheckboxChange}
                                  />
                                  {open ? (
                                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                  ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                  )}
                                </DisclosureButton>
                                <DisclosurePanel className="text-gray-500 px-4">
                                To opt into this package, you must be an active member 
                                of Greek Life. This package offers an additional $25 and 
                                requires an extra 30 minutes beyond the standard tour. You 
                                will be responsible for showing families who select this package 
                                your respective fraternity or sorority house, providing insights 
                                on the rushing process and Greek Life, and answering any related 
                                questions they may have. Please indicate more about your 
                                experience in Greek Life within your on-campus activities 
                                section on your profile!
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        </div>

                        <div className="w-full px-3 mb-6">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <DisclosureButton className="flex justify-between w-full text-left">
                                  <Checkbox
                                    name="student_athlete"
                                    label="Student Athlete"
                                    checked={formData.student_athlete}
                                    onChange={handleCheckboxChange}
                                  />
                                  {open ? (
                                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                  ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                  )}
                                </DisclosureButton>
                                <DisclosurePanel className="text-gray-500 px-4">
                                To opt into this package, you must be a varsity student-athlete at your 
                                school. This package offers an additional $25 and requires an extra 30 minutes 
                                beyond the standard tour. You will be responsible for showing the athletic 
                                facility along with the building where you practice and play your sport. You 
                                will also be required to give insights into the recruiting process and answer 
                                any questions the family may have. Please indicate more about your experience 
                                as a student-athlete within your on-campus activities section on your profile!
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        </div>

                        <div className="w-full px-3 mb-6">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <DisclosureButton className="flex justify-between w-full text-left">
                                  <Checkbox
                                    name="paid_internship"
                                    label="Paid Internship"
                                    checked={formData.paid_internship}
                                    onChange={handleCheckboxChange}
                                  />
                                  {open ? (
                                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                                  ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                                  )}
                                </DisclosureButton>
                                <DisclosurePanel className="text-gray-500 px-4">
                                To opt into this package, you must have completed a paid internship. 
                                This package offers an additional $20 and requires an extra 30 minutes 
                                beyond the standard tour. You will be responsible for talking extensively 
                                about your internship and how you achieved it. This includes giving insights 
                                into the recruiting process, how to get set up in the field you are pursuing, 
                                and any tips to get started with Freshman year classes. Please indicate more 
                                about your paid internship within your work experience section on your profile!
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Full Name:</span>
                        <span className="text-gray-700">{responseData.guide.name}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Email:</span>
                        <span className="text-gray-700">{responseData.guide.email}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">School:</span>
                        <span className="text-gray-700">{responseData.guide.school}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Hometown:</span>
                        <span className="text-gray-700">{responseData.guide.hometown}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Phone:</span>
                        <span className="text-gray-700">{responseData.guide.phone}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Bio:</span>
                        <span className="text-gray-700">{responseData.guide.bio}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Major:</span>
                        <span className="text-gray-700">{responseData.guide.major}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Secondary Major:</span>
                        <span className="text-gray-700">{responseData.guide.secondary_major}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Minor:</span>
                        <span className="text-gray-700">{responseData.guide.minor}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Secondary Minor:</span>
                        <span className="text-gray-700">{responseData.guide.secondary_minor}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Instagram:</span>
                        <span className="text-gray-700">{responseData.guide.instagram}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">LinkedIn:</span>
                        <span className="text-gray-700">{responseData.guide.linkedin}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Graduation Year:</span>
                        <span className="text-gray-700">{responseData.guide.grad_year}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Greek Life:</span>
                        <span className="text-gray-700">{responseData.guide.greek_life ? 'Yes' : 'No'}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Student Athlete:</span>
                        <span className="text-gray-700">{responseData.guide.student_athlete ? 'Yes' : 'No'}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row py-2">
                        <span className="font-bold w-full sm:w-72">Paid Internship:</span>
                        <span className="text-gray-700">{responseData.guide.paid_internship ? 'Yes' : 'No'}</span>
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
