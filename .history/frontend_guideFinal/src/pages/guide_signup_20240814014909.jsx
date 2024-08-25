import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";
import { signUp, confirmSignUp, resendConfirmationCode } from './../cognitoConfig';
import majors from './majors.json';

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post('http://localhost:3000/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

export function GuideSignUp() {
  const [postData, setPostData] = useState({
    name: '',
    email: '',
    school: '',
    hometown: '',
    phone: '',
    bio: '',
    major: '',
    secondary_major: '',
    minor: '',
    secondary_minor: '',
    profile_image_url: '',
    instagram: '',
    linkedin: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const [hobbyData, setHobbyData] = useState([{ hobby_name: '', description: '' }]);
  const [activityData, setActivityData] = useState([{ activity_name: '', description: '' }]);
  const [expData, setExpData] = useState([{exp_name: '', description}]);

  const [responseData, setResponseData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/schoolNames');
        setSchools(response.data.schools);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError('Error fetching schools. Please try again later.');
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleSchoolChange = (e) => {
    const inputValue = e.target.value;
    setSelectedSchool(inputValue);
    if (inputValue) {
      const filtered = schools.filter((school) =>
        school.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools([]);
    }
  };

  const handleSchoolSelect = (aSchool) => {
    setSelectedSchool(aSchool);
    setPostData((prevState) => ({
      ...prevState,
      school: aSchool,
    }));
    setFilteredSchools([]);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validFileTypes = ['image/jpeg', 'image/png']; // Add the file types you want to allow
    if (file && !validFileTypes.includes(file.type)) {
      alert('Only JPEG, JPG, and PNG files are allowed.');
      e.target.value = ''; // Reset the file input
      return;
    }
    setFile(file);
  };

  const handleAddHobby = () => {
    setHobbyData([...hobbyData, { hobby_name: '', description: '' }]);
  };

  const handleHobbyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHobbies = hobbyData.map((hobby, i) => {
      if (i === index) {
        return { ...hobby, [name]: value };
      }
      return hobby;
    });
    setHobbyData(updatedHobbies);
  };

  const handleRemoveHobby = (index) => {
    const updatedHobbies = hobbyData.filter((_, i) => i !== index);
    setHobbyData(updatedHobbies);
  };

  const handleAddActivity = () => {
    setActivityData([...activityData, { activity_name: '', description: '' }]);
  };

  const handleActivityChange = (index, e) => {
    const { name, value } = e.target;
    const updatedActivities = activityData.map((activity, i) => {
      if (i === index) {
        return { ...activity, [name]: value };
      }
      return activity;
    });
    setActivityData(updatedActivities);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = activityData.filter((_, i) => i !== index);
    setActivityData(updatedActivities);
  };

  const insertBackend = async () => {
    const { email } = postData;
    try {
      const result = await postImage({ image: file });
      postData.profile_image_url = result.imagePath;

      setImages([result.imagePath, ...images]);
      await axios.post('http://localhost:3000/api/newGuide', postData);

      for (const hobby of hobbyData) {
        hobby.email = email;
        await axios.post('http://localhost:3000/api/newHobby', hobby);
      }

      for (const activity of activityData) {
        activity.email = email;
        await axios.post('http://localhost:3000/api/newActivity', activity);
      }

      return;

    } catch (error) {
      alert("Error Submitting Profile: No large image files or live photos on IOS");
      throw error;
    }
  };

  const validateForm = () => {
    const { email, password, confirmPassword, school } = postData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const eduPattern = /\.edu$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailPattern.test(email) || !eduPattern.test(email)) {
      return 'Please enter a valid .edu email address.';
    }
    if (!passwordPattern.test(password)) {
      return 'Password must be at least 8 characters long and include an upper case letter, a lower case letter, and a number.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    if (!school) {
      return 'Please enter a school, click the school on the dropdown menu after you type it in';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { email, password } = postData;

    try {
      await insertBackend();
      await signUp(email, password);
      setMessage('Registration successful! Please check your email for the verification code.');
      setIsVerifying(true);
      setError('');
    } catch (error) {
      if (error.message === 'User already exists') {
        try {
          await resendConfirmationCode({ username: email });
          setMessage('Account already exists but is not confirmed. Resending verification code.');
          setIsVerifying(true);
          setError('');
        } catch (resendError) {
          setError('Account already exists. Please sign in.');
        }
      } else {
        setError(error.message || JSON.stringify(error));
      }
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const { email, verificationCode } = postData;
    try {
      await confirmSignUp(email, verificationCode);
      setMessage('Verification successful! You can now sign in.');
      setVerified(true);
      setPostData({
        name: '',
        email: '',
        school: '',
        hometown: '',
        phone: '',
        bio: '',
        major: '',
        secondary_major: '',
        minor: '',
        secondary_minor: '',
        profile_image_url: '',
        instagram: '',
        linkedin: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
      });
      setHobbyData([{ hobby_name: '', description: '' }]);
      setActivityData([{ activity_name: '', description: '' }]);
      setIsVerifying(false);
      setIsSubmited(true);
      setError('');
    } catch (error) {
      if (error.message == 'User cannot be confirmed. Current status is CONFIRMED') {
        alert('You already have an account. Please login.');
        window.location.href = '/sign-in';
      }
      setError(error.message || JSON.stringify(error));
    }
  };

  const handleResendCode = async () => {
    const { email } = postData;

    if (window.confirm('Are you sure you want to resend the confirmation code?')) {
      await resendConfirmationCode({ username: email });
      setMessage('Verification code resent. Please check your email.');
      setError('');
    }
  };

  const renderMajorOptions = () => {
    const sortedMajors = Object.values(majors).flat().sort();
    return sortedMajors.map((major) => (
      <option key={major} value={major}>{major}</option>
    ));
  };

  return (
    <div>
      {!isSubmited ? (
        <div className="relative isolate px-6 pt-14 lg:px-8 pb-12 bg-gray-100 ">
          <div className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          </div>

          <div className="pt-24 mt-12 sm:pt-32 mb-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-blue-900">We Want You </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Become a tour guide today</p>
                <p className="mt-6 text-lg leading-8 text-gray-800">Tour guides make or break a tour. We are looking for enthusiastic and energetic guides who 
                  are excited to show off their campus and provide the meaningful tours they wished they had received.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mb-12">
            {!isVerifying ? (
              <form onSubmit={handleSubmit} className="w-full max-w-lg ">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                      Name*
                    </Typography>
                    <Input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={postData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                      Email*
                    </Typography>
                    <Input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="email"
                      type="text"
                      placeholder="name@mail.com"
                      value={postData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full  px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="school">
                      School (Official Name)*
                    </Typography>
                    <Input
                      type="text"
                      value={selectedSchool}
                      onChange={handleSchoolChange}
                      name="school"
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Start typing to search for a school..."
                    />
                    {filteredSchools.length > 0 && (
                      <ul className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto bg-gray-200">
                        {filteredSchools.map((school, index) => (
                          <li
                            key={index}
                            onClick={() => handleSchoolSelect(school)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                          >
                            {school}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hometown">
                      Hometown (City, State)*
                    </Typography>
                    <Input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="hometown"
                      type="text"
                      placeholder="Albuquerque"
                      value={postData.hometown}
                      onChange={handleInputChange}
                      required
                    />
                  </div>


                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                      Phone Number*
                    </Typography>
                    <Input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="phone"
                      type="text"
                      placeholder="123-456-7890"
                      value={postData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"> Example: 555-555-5555</Typography>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bio">
                      A brief about you*
                    </Typography>
                    <Textarea
                      cols="40"
                      rows="5"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="bio"
                      type="text"
                      placeholder="~100 words"
                      value={postData.bio}
                      onChange={handleInputChange}
                      required
                    >
                    </Textarea>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="major">
                      Major*
                    </Typography>
                    <select
                      name="major"
                      value={postData.major}
                      onChange={handleInputChange}
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    >
                      <option value="">Select a major</option>
                      {renderMajorOptions()}
                    </select>

                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="minor">
                      Minor
                    </Typography>
                    <select
                      name="minor"
                      value={postData.minor}
                      onChange={handleInputChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    >
                      <option value="">Choose Minor</option>
                      {renderMajorOptions()}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_major">
                      Secondary Major
                    </Typography>
                    <select
                      name="secondary_major"
                      value={postData.secondary_major}
                      onChange={handleInputChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    >
                      <option value="">Choose Second Major</option>
                      {renderMajorOptions()}
                    </select>

                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_minor">
                      Secondary Minor
                    </Typography>
                    <select
                      name="secondary_minor"
                      value={postData.secondary_minor}
                      onChange={handleInputChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    >
                      <option value="">Second Minor</option>
                      {renderMajorOptions()}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="instagram">
                      Instagram Url
                    </Typography>
                    <Input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      name="instagram"
                      type="text"
                      placeholder="toured.it"
                      value={postData.instagram}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="linkedin">
                      LinkedIn Url
                    </Typography>
                    <Input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="linkedin"
                      type="text"
                      placeholder="TouredIt"
                      value={postData.linkedin}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Profile Picture*
                    </Typography>
                    <Input
                      name="profile_image_url"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Hobbies, activities, and jobs are a critical part in how guides are selected to give tours. We want to match tourees
                      with the most compatible guide. Please add at least one hobby and one activity/involvement you participate in on campus.
                      You will have the opportunity to add additional ones or edit them later on in your portal.
                    </Typography>
                  </div>
                </div>

                <div>
                  {hobbyData.map((hobby, index) => (
                    <div key={index} className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hobby_name">
                          Hobby Name:
                        </Typography>
                        <Input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          name="hobby_name"
                          type="text"
                          placeholder="Name"
                          value={hobby.hobby_name}
                          onChange={(e) => handleHobbyChange(index, e)}
                          required
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                          Description:
                        </Typography>
                        <Textarea
                          cols="40"
                          rows="3"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          name="description"
                          type="text"
                          placeholder="~50 words maximum"
                          value={hobby.description}
                          onChange={(e) => handleHobbyChange(index, e)}
                          required
                        />
                      </div>
                      <div className="w-full flex justify-end mt-2">
                        <Button color="red" onClick={() => handleRemoveHobby(index)} className="ml-2 py-3 px-3">
                          Remove Hobby
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="w-full flex justify-end mt-2">
                    <Button onClick={handleAddHobby} className="ml-2 py-3 px-3">
                      Add Hobby
                    </Button>
                  </div>
                </div>

                <div>
                  {activityData.map((activity, index) => (
                    <div key={index} className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="activity_name">
                          On-campus activities:
                        </Typography>
                        <Input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          name="activity_name"
                          type="text"
                          placeholder="Name"
                          value={activity.activity_name}
                          onChange={(e) => handleActivityChange(index, e)}
                          required
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                          Description:
                        </Typography>
                        <Textarea
                          cols="40"
                          rows="3"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          name="description"
                          type="text"
                          placeholder="~50 words maximum"
                          value={activity.description}
                          onChange={(e) => handleActivityChange(index, e)}
                          required
                        />
                      </div>
                      <div className="w-full flex justify-end mt-2">
                        <Button color="red" onClick={() => handleRemoveActivity(index)} className="ml-2 py-3 px-3">
                          Remove Activity
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="w-full flex justify-end mt-2">
                    <Button onClick={handleAddActivity} className="ml-2 py-3 px-3">
                      Add Activity
                    </Button>
                  </div>
                </div>

                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  name="password"
                  value={postData.password}
                  onChange={handleInputChange}
                  required
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Confirm Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  name="confirmPassword"
                  value={postData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Checkbox
                  label={
                    (
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        I agree the Terms and Conditions
                      </Typography>
                    )
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                {!isChecked && 
                  <div className="mx-auto p-4 mb-20">
                    <div className="pdf-viewer-container h-80">
                      <object data="./../../public/terms.pdf" type="application/pdf" width="100%" height="120%">
                        <p>Your browser does not support PDFs. <a href="./../../public/terms.pdf">Download the PDF</a>.</p>
                      </object>
                    </div>
                  </div>
                }
                {error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
                {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Submit
                </Button>
              </form>

            ) : (
              <form onSubmit={handleVerification} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Verification Code
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="123456"
                    name="verificationCode"
                    value={postData.verificationCode}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Button className="mt-6" fullWidth type="submit">
                  Verify Now
                </Button>
                {error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
                {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
                <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                  Didn't receive the code?
                  <Button variant="text" className="text-gray-900 ml-2" onClick={handleResendCode}>Resend Code</Button>
                </Typography>
              </form>
            )}
          </div>
        </div>  
      ) : ( 
        <div className="relative isolate px-6 pt-14 lg:px-8 pb-12 bg-gray-100 ">
          <div className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          </div>

          <div className="py-24 mt-12 sm:py-32 mb-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Registration Complete!</p>
                <img
                src="./../../public/img/verificationCheck.png"
                alt="Verification Check"
                className="max-w-xs mx-auto"
              />
                <p className="mt-6 mb-6 text-lg leading-8 text-gray-800">
                  Thank you for becoming a guide today. Guides get paid $40 per tour, and these tours
                  normally last for 90 minutes. Please sign in to view you profile and to ensure all information is correct.
                  Feel free to update your profile as you see fit. When you are selected for a tour you will receive an email with
                  instructions on what to do. We are excited to have you onboard!
                </p>
                <Link to={"/sign-in"}>
                    <Button className="mt-12" fullWidth type="submit">
                        Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      )} 
    </div>
  );
}

export default GuideSignUp;
