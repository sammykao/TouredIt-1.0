import React, { useState, useEffect } from 'react';
import {Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function UpdateHobbies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const email = sessionStorage.username;

  const [hobbyData, setHobbyData] = useState({
    email:'',
    activity_name: '',
    description: ''
  });

  useEffect(() => {
    console.log(email);
    axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        const newImageUrl = `https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/images/${response.data.guide.profile_image_url}`;
        setImageUrl(newImageUrl);
        hobbyData.email = response.data.guide.email;
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        return;
      });
      
  }, [email]);


  
   // For adding hobbies
   const [hobbyResponseData, setHobbyResponseData] = useState(null); // State to hold response data


   const handleHobbyChange = (e) => {
     const { name, value } = e.target;
     setHobbyData((prevState) => ({
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
 
       console.log(hobbyData);
 
       // Reset the form after successful submission
       setHobbyData({
         tourguide_id: '',
         hobby_name: '',
         description: ''
       });
     } catch (error) {
       setError('Error posting data: ' + error.message); // Store error message in state
       setResponseData(null); // Clear response data
     }
 
     axios.post("https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo", { email })
      .then(response => {
        setResponseData(response.data);
        hobbyData.email = response.data.guide.email;
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        return;
      });
 
   };

   const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/home';
  };
 
 
   // for deleting hobbies
 
   // const [deleteData, setDeleteData] = useState({
   //    hobby_id: 1
   // });
 
   // const deleteHobby = async (e) => {
   //   const hobbyId = e.target.value;
   //   setDeleteData((prevState) => ({
   //     ...prevState,
   //     hobby_id: hobbyId,
   //   }));
   //   console.log(hobbyId);
 
   //   try {
   //     const response = await fetch('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/remHobby', {
   //       method: 'POST',
   //       headers: {
   //         'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(deleteData),
   //     });
 
   //     if (!response.ok) {
   //       throw new Error('Network response was not ok');
   //     }
 
   //     const data = await response.json();
   //     setHobbyResponseData(data); // Store response data in state
   //     setError(null); // Clear any previous errors
 
   //     console.log(hobbyData);
 
   //     // Reset the form after successful submission
   //     setDeleteData({
   //       hobby_id: ''
   //     });
   //   } catch (error) {
   //     setError('Error posting data: ' + error.message); // Store error message in state
   //     setResponseData(null); // Clear response data
   //   }
 
   //   try {
   //     const response = await fetch('https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/api/retGuideInfo', {
   //       method: 'POST',
   //       headers: {
   //         'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(postData),
   //     });
 
   //     if (!response.ok) {
   //       throw new Error('Network response was not ok');
   //     }
 
   //     const data = await response.json();
   //     setResponseData(data); // Store response data in state
   //     setError(null); // Clear any previous errors
   //     const newImageUrl = `https://zytxastigf5jf3p5qhcb472ba40icqyo.lambda-url.us-east-2.on.aws/images/${data.guide.profile_image_url}`;
   //     setImageUrl(newImageUrl);
   //     setFormSubmitted(true); // Set formSubmitted to true
   //     // Reset the form after successful submission
   //     setPostData({
   //       email: data.guide.email
   //     });
   //   } catch (error) {
   //     setError('Error posting data: ' + error.message); // Store error message in state
   //     setResponseData(null); // Clear response data
   //   }
 
   // };




  if (loading) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
      
        </div>
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



  return (
    
    <div>
        <div>
        <div className='bg-blue-gray-700 shadow-md flex items-center p-4'>
      <Typography
        className='text-3xl font-semibold text-white ml-12'
      >
        Update Hobbies
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
        <div className="bg-gray-100  p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">{responseData.guide.name}</h1>
              <div className="mt-2">
              <Link to="/profile" className='hover:text-gray-500' >Home</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/update-activities" className='hover:text-gray-500' >Update Activities</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/update-hobbies" className='hover:text-gray-500' >Update hobbies</Link>
                <span className="mx-1 text-gray-400">•</span>
                <Link to="/tours" className='hover:text-gray-500' >Tours</Link>
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
      
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">

          <div className="mt-2">
          <Typography className="text-lg font-semibold text-gray-700 mb-4">
          <li className="flex py-2">
            <span className="font-bold w-72">Hobbies</span>
            <span className="font-bold w-72">Name</span>
            <span className="font-bold w-72">Description</span>
            </li></Typography>
          </div>
          <ul className="text-gray-700 ">
                {responseData.guide.hobbies.map((hobby, key) => (
                    <li className="flex border-y py-2">
                        <span className="font-bold w-72">Hobby:</span>
                        <span className="text-gray-700 w-72">{hobby.hobby_name}</span>
                        <span className="text-gray-700 mr-44">{hobby.description}</span>
                        {/* Wait for mvp 2 */}
                        {/* <span className="ml-auto ">
                          <button 
                              // type="button"
                              className="bg-gray-700  hover:bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                              value={hobby.hobby_id}
                              // onClick={deleteHobby}
                              >Delete hobby</button>
                        </span> */}
                    </li>
                ))}
              
          </ul>
          <Typography className="text-lg font-semibold text-gray-700 mb-4">
          <li className="flex py-2">
            <span className="font-bold w-72">Add new hobbies</span>
            </li></Typography>
            <form  name="hobby-form" onSubmit={addHobby}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_major">
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_minor">
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
                  required>

              </textarea>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 flex justify-center mx-auto">
            <button 
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Add hobby</button>
            </div>
            </form>

            
        </div>
      </div>
      
      </div>
      </div>
      </div>

  );
}

export default UpdateHobbies;
