import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";
import { signUp, confirmSignUp, resendConfirmationCode } from './../cognitoConfig';


async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('http://localhost:3001/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
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
  password: "",
  confirmPassword: "",
  verificationCode: ""
});
const [responseData, setResponseData] = useState(null); // State to hold response data
const [error, setError] = useState(null); // State to hold error message



const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState()

  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [isVerifying, setIsVerifying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");

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
  setFile(file)
  if (file) {
    console.log('Selected file name:', file.name);
    
  }
};

// const handleSubmit = async (e) => {
//   e.preventDefault();

  

//   try {

//     const result = await postImage({image: file, description})
//     console.log(result.imagePath)
//     const updatedPostData = {
//       ...postData,
//       profile_image_url: result.imagePath,
//     };

//     setImages([result.image, ...images])


//     const response = await fetch('http://localhost:3001/api/newGuide', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedPostData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     setResponseData(data); // Store response data in state
//     setError(null); // Clear any previous errors
//     // Reset the form after successful submission
//     setPostData({
//       name: '',
//       email: '',
//       school: '',
//       hometown: '',
//       phone: '',
//       bio: '',
//       major: '',
//       secondary_major: '',
//       minor: '',
//       secondary_minor: '',
//       profile_image_url: '',
//       instagram: '',
//       linkedin: '',
//       password: "",
//       confirmPassword: "",
//       verificationCode: ""
//     });
//     window.location.href = '/profile'; 
//   } catch (error) {
//     setError('Error posting data: ' + error.message); // Store error message in state
//     console.log(error)
//     setResponseData(null); // Clear response data
//   }
// };

const insertBackend = async () => {
  // const { email, name, phoneNumber } = formData;
  // const newAccount = { email, name, phone: phoneNumber };
  try {
    const result = await postImage({image: file, description})
    console.log(result.imagePath)
    // const updatedPostData = {
    //   ...postData,
    //   profile_image_url: result.imagePath,
    // };
    postData.profile_image_url = result.imagePath;

    setImages([result.image, ...images])
    const response = await axios.post('http://localhost:3001/api/newGuide', postData);
    console.log(response);
    return;

  } catch (error) {
    console.error('Error Inserting Account:', error);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  // const validationError = validateForm();
  // if (validationError) {
  //   console.log(validationError);
  //   setError(validationError);
  //   return;
  // }

  const { email, password, name, phone, hometown, school} = postData;

  try {
    await signUp(email, password, name, phone, hometown, school);
    setMessage("Registration successful! Please check your email for the verification code.");
    setIsVerifying(true);
    setError("");
  } catch (error) {
    setError(error.message || JSON.stringify(error));
  }
};












const handleVerification = async (e) => {
  e.preventDefault();
  const { email, verificationCode } = postData;

  try {
    await confirmSignUp(email, verificationCode);
    setMessage("Verification successful! You can now sign in.");
    insertBackend();
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
      password: "",
      confirmPassword: "",
      verificationCode: ""
    });
    setIsVerifying(false);
    setError("");
  } catch (error) {
    setError(error.message || JSON.stringify(error));
  }
};

const handleResendCode = async () => {
  const { email } = postData;

  try {
    await resendConfirmationCode({ username: email });
    setMessage("Verification code resent. Please check your email.");
    setError("");
  } catch (error) {
    setError(error.message || JSON.stringify(error));
  }
};

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100 mb-auto">
    <div
      className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
    </div>

    <div className="py-24 mt-12 sm:py-32 mb-12">
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

    <div className="flex justify-center items-center h-screen mb-12 mt-10">
  {!isVerifying ? (
    <form  onSubmit={handleSubmit} className="w-full max-w-lg ">
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
        School*
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
        Hometown*
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
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
          required>

      </Textarea>
    </div>
  </div>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="major">
        Major*
      </Typography>
      <Input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          name="major" 
          type="text" 
          placeholder="Economics"
          value={postData.major}
          onChange={handleInputChange}
          required
          />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="minor">
        Minor
      </Typography>
      <Input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="minor" 
          type="text" 
          placeholder="Finance"
          value={postData.minor}
          onChange={handleInputChange}
          />
    </div>
  </div>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_major">
        Secondary Major
      </Typography>
      <Input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          name="secondary_major" 
          type="text" 
          placeholder="Biology"
          value={postData.secondary_major}
          onChange={handleInputChange}
          />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_minor">
        Secondary Minor
      </Typography>
      <Input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="secondary_minor" 
          type="text" 
          placeholder="Chemistry"
          value={postData.secondary_minor}
          onChange={handleInputChange}
          />
    </div>
  </div>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="instagram">
        Instagram Username*
      </Typography>
      <Input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          name="instagram" 
          type="text" 
          placeholder="toured.it"
          value={postData.instagram}
          onChange={handleInputChange}
          required
          />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="linkedin">
        LinkedIn Username*
      </Typography>
      <Input 
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          name="linkedin" 
          type="text" 
          placeholder="TouredIt"
          value={postData.linkedin}
          onChange={handleInputChange}
          required
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
          I agree the
          <Link to="/terms" className="font-medium transition-colors hover:text-blue-500">
            &nbsp;Terms and Conditions
          </Link>
        </Typography>
      )
    }
    containerProps={{ className: "-ml-2.5" }}
    checked={isChecked}
    onChange={handleCheckboxChange}
  />


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
    <Link to="sign-in">
    <Button className="mt-6" fullWidth type="submit">
      Verify Now
    </Button>
    </Link>
    {error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
    {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
      Didn't receive the code?
      <Button variant="text" className="text-gray-900 ml-2" onClick={handleResendCode}>Resend Code</Button>
    </Typography>
  </form>
)}

</div>
<br/>
<br/>
</div>
  );
}

export default GuideSignUp;