import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Textarea, Typography } from "@material-tailwind/react";
import { signUp, confirmSignUp, resendConfirmationCode } from './../cognitoConfig';
import ProfileForm from "./signupHelper/profileForm";
import ExtraDetailsPage from './signupHelper/hobbiesForm';

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

export function GuideSignUp() {
  const [currentPage, setCurrentPage] = useState(1); // Track form page
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
    grad_year: '',
    greek_life: false,
    student_athlete: false,
    paid_internship: false,
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const [hobbyData, setHobbyData] = useState([{ hobby_name: '', description: '' }]);
  const [activityData, setActivityData] = useState([{ activity_name: '', description: '' }]);
  const [expData, setExpData] = useState([{ exp_name: '', description: '' }]);
  const [error, setError] = useState(null);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
 

  

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

  const handleRemoveWorkExp = (index) => {
    const updatedExp = expData.filter((_, i) => i !== index);
    setExpData(updatedExp);
  };

  const handleAddWorkExp = () => {
    setExpData([...expData, { job_name: '', description: '' }]);
  };

  const handleWorkExpChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExp = expData.map((exp, i) => {
      if (i === index) {
        return { ...exp, [name]: value };
      }
      return exp;
    });
    setExpData(updatedExp);
  };

  const handlePostDataSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const result = await postImage({ image: file });
      postData.profile_image_url = result.imagePath;
      await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/newGuide', postData);
      setError('');
      setCurrentPage(2); // Navigate to activities and hobbies page
    } catch (error) {
      alert(error);
      if (error.code === 503) {
        setError('If on mobile, please try to upload non-live IOS images');
      } else if (error.message === 'User already exists') {
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

  const handleActivitiesSubmit = async (e) => {
    e.preventDefault();
    const { email } = postData;

    try {
      for (const hobby of hobbyData) {
        hobby.email = email;
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/newHobby', hobby);
      }
      for (const activity of activityData) {
        activity.email = email;
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/newActivity', activity);
      }
      for (const exp of expData) {
        exp.email = email;
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/newWorkExp', exp);
      }
      await signUp(email, postData.password);
      setMessage('Registration successful! Please check your email for the verification code.');
      setIsVerifying(true);
    } catch (error) {
      setError(error.message || JSON.stringify(error));
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
    if (!isChecked) {
      return 'Please Accept Our Terms and Conditions';
    }
    return null;
  };



  const handleVerification = async (e) => {
    e.preventDefault();
    const { email, verificationCode } = postData;
    try {
      await confirmSignUp(email, verificationCode);
      setMessage('Verification successful! You can now sign in.');
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

          <div className="mb-12">
            {!isVerifying ? (
              <>
                {loading ? (
                  <div className=''>

                  </div>
                ) : (
                  <>
                    {currentPage === 1 && (
                      <ProfileForm
                        handleSubmit={handlePostDataSubmit}
                        postData={postData}
                        setSelectedSchool={setSelectedSchool}
                        setFilteredSchools={setFilteredSchools}
                        setPostData={setPostData}
                        filteredSchools={filteredSchools}
                        selectedSchool={selectedSchool}
                        setFile={setFile}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        error={error}
                        message={message}
                      />
                    )}
  
                    {currentPage === 2 && (
                      <ExtraDetailsPage 
                        hobbyData={hobbyData}
                        handleHobbyChange={handleHobbyChange}
                        handleAddHobby={handleAddHobby}
                        handleRemoveHobby={handleRemoveHobby}
                        activityData={activityData}
                        handleActivityChange={handleActivityChange}
                        handleAddActivity={handleAddActivity}
                        handleRemoveActivity={handleRemoveActivity}
                        expData={expData}
                        handleWorkExpChange={handleWorkExpChange}
                        handleAddWorkExp={handleAddWorkExp}
                        handleRemoveWorkExp={handleRemoveWorkExp}
                        handleActivitiesSubmit={handleActivitiesSubmit}
                      />
                    )}
                  </>
                )}
              
              </>
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
                  normally last for 90 minutes. Guides get paid $25 per call, and these calls last 45 minutes.
                  Please sign in to view you profile and to ensure all information is correct.
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
