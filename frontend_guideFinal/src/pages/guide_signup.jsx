import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from "@material-tailwind/react";



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
  linkedin: ''
});
const [responseData, setResponseData] = useState(null); // State to hold response data
const [error, setError] = useState(null); // State to hold error message



const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/schoolNames');
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

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setPostData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const redirectGuide = async (e) => {
  window.location.href = '/profile'; 
}

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    console.log('Selected file name:', file.name);
    setPostData((prevState) => ({
      ...prevState,
      profile_image_url: file.name,
    }));
  }
};

const [hobbyList, setHobbyList] = useState([{ hobby: "" }]);

  const handleHobbyChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...hobyyList];
    list[index][name] = value;
    setHobbyList(list);
  };

  const handleHobbyRemove = (index) => {
    const list = [...hobbyList];
    list.splice(index, 1);
    setHobbyList(list);
  };

  const handleHobbyAdd = () => {
    setHobbyList([...hobbyList, { hobby: "" }]);
  };

  const [involvementList, setInvolvementList] = useState([{ involvement: "" }]);

  const handleInvolvementChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...hobyyList];
    list[index][name] = value;
    setInvolvementList(list);
  };

  const handleInvolvementRemove = (index) => {
    const list = [...involvementList];
    list.splice(index, 1);
    setInvolvementList(list);
  };

  const handleInvolvementAdd = () => {
    setInvolvementList([...involvementList, { involvement: "" }]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/newGuide', {
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
    // Reset the form after successful submission
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
      linkedin: ''
    });
    window.location.href = '/profile'; 
  } catch (error) {
    setError('Error posting data: ' + error.message); // Store error message in state
    console.log(error)
    setResponseData(null); // Clear response data
  }
};




  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500 mb-auto">
    <div
      className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>

    <div class="py-24 mt-12 sm:py-32 mb-12">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
              <h2 class="text-base font-semibold leading-7 text-blue-900">We Want You </h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Become a tour guide today</p>
              <p class="mt-6 text-lg leading-8 text-gray-800">Tour guides make or break a tour. We are looking for enthusiastic and energetic guides who 
              are excited to show off their campus and provide the meaningful they wished they had received.
              </p>
              <p class="mt-6 text-lg leading-8 text-gray-800">Already a guide?</p>
              
              <p class="mt-6 mb-12 text-lg leading-8 text-gray-800">
              <Link to="/profile" >
              <button onclick= {redirectGuide}
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             >Login here</button>
            </Link>
              </p>
            </div></div></div>



    <div className="flex justify-center items-center h-screen mb-12 mt-10">
        
    <form  onSubmit={handleSubmit} class="w-full max-w-lg ">
    <p class="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Signup!</p>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
        Name*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="name" 
          type="text" 
          placeholder="Jane Doe"
          onChange={handleInputChange}
          required
          />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
        Email*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="email" 
          type="text" 
          placeholder="name@mail.com"
          onChange={handleInputChange}
          required
          />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full  px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="school">
        School*
      </label>
      {/* <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="school" 
          type="text" 
          placeholder="University"
          onChange={handleInputChange}
          required
          /> */}
          <input
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}
            name="school"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 

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
  
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="hometown">
        Hometown*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="hometown" 
          type="text" 
          placeholder="Albuquerque"
          onChange={handleInputChange}
          required
          />
        </div>
    
    
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
        Phone Number*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="phone" 
          type="text" 
          placeholder="123-456-7890"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={handleInputChange}
          required
          />
        <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"> Example: 555-555-5555</Typography>
    </div>
  </div>
  
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="bio">
        A brief about you*
      </label>
      <textarea 
          cols="40" 
          rows="5" 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="bio" 
          type="text" 
          placeholder="~100 words"
          onChange={handleInputChange}
          required>

      </textarea>
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="major">
        Major*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          name="major" 
          type="text" 
          placeholder="Economics"
          onChange={handleInputChange}
          required
          />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="minor">
        Minor
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="minor" 
          type="text" 
          placeholder="Finance"
          onChange={handleInputChange}
          />
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="secondary_major">
        Secondary Major
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          name="secondary_major" 
          type="text" 
          placeholder="Biology"
          onChange={handleInputChange}
          />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="secondary_minor">
        Secondary Minor
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="secondary_minor" 
          type="text" 
          placeholder="Chemistry"
          onChange={handleInputChange}
          />
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="instagram">
        Instagram Username*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          name="instagram" 
          type="text" 
          placeholder="toured.it"
          onChange={handleInputChange}
          required
          />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="linkedin">
        LinkedIn Username*
      </label>
      <input 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="linkedin" 
          type="text" 
          placeholder="TouredIt"
          onChange={handleInputChange}
          required
          />
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">

    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Profile Picture*
      </label>
      <input  
      name="profile_image_url" 
      type="file"
      onChange={handleFileChange}
      required
      />
    </div>
  </div>
  {/* <div className="mb-6 my-auto">
  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    Hobby/Hobbies
  </label>
  {hobbyList.map((singleHobby, index) => (
    <div key={index} className="mb-4">
      <div className="flex justify-between">
        <input
          className="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name="hobby"
          type="text"
          id={`hobby-${index}`}
          value={singleHobby.hobby}
          placeholder="drawing"
          onChange={(e) => handleHobbyChange(e, index)}
          required
        />
        {hobbyList.length !== 1 && (
          <button
            type="button"
            onClick={() => handleHobbyRemove(index)}
            className="remove-btn ml-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded"
          >
            Remove
          </button>
        )}
    </div>
      {hobbyList.length - 1 === index && hobbyList.length < 6 && (
        <button
          type="button"
          onClick={handleHobbyAdd}
          className="add-btn mt-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded"
        >
          Add a Hobby
        </button>
      )}
    </div>
  ))}
  </div> */}

{/* <div className="mb-6 my-auto">
  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    Campus Involvement
  </label>
  {involvementList.map((singleInvolvement, index) => (
    <div key={index} className="mb-4">
      <div className="flex justify-between">
        <input
          className="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name="involvement"
          type="text"
          id={`involvement-${index}`}
          value={singleInvolvement.involvment}
          placeholder="greek life"
          onChange={(e) => handleInvolvementChange(e, index)}
          required
        />
        {involvementList.length !== 1 && (
          <button
            type="button"
            onClick={() => handleInvolvementRemove(index)}
            className="remove-btn ml-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded"
          >
            Remove
          </button>
        )}
      </div>
      {involvementList.length - 1 === index && involvementList.length < 6 && (
        <button
          type="button"
          onClick={handleInvolvementAdd}
          className="add-btn mt-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded"
        >
          Add an Involvement
        </button>
      )}
    </div>
  ))}
</div> */}



  <button 
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Submit</button>
 

</form>

</div>
<br/>
<br/>
</div>
  );
}

export default GuideSignUp;