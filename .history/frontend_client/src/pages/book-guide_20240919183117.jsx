import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { isAuthenticated } from "./../tools/auth/loggedIn";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import Sidebar from "./bookingHelper/sidebar";
import CallSidebar from "./bookingHelper/callsidebar";


const BookGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, school } = location.state || {};
  const [guideInfo, setGuideInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCallSidebar, setShowCallSidebar] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    comments: '',
    greek_life: false,
    student_athlete: false,
    paid_internship: false,
    referral_code: '',
  });



  useEffect(() => {
    const fetchGuideInfo = async () => {
      if (!email) {
        setError('No email provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/guideInfo', { email });
        setGuideInfo(response.data.guide);
      } catch (err) {
        setError('Error fetching guide information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideInfo();
  }, [email]);



  const handleTourBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      window.location.href = "/sign-in";
      return;
    }
    try {
      setLoading(true);
      await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendBookingRequest', 
      { data: tourBookingData, 
        school: guideInfo.school,
        email: sessionStorage.username, 
        guide_email: email });
      setTourBookingData({
        date: '',
        comments: '',
        greek_life: false,
        student_athlete: false,
        paid_internship: false,
        referral_code: '',
      });
      window.location.href = "/thanks";
    } catch (error) {
      setLoading(false);
      console.error('Error sending request:', error);
      alert('Error sending request. Please try again later');
    }
    return;
  };

  const handleCallBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      window.location.href = "/sign-in";
      return;
    }
    try {
      setLoading(true);
      await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendCallRequest', 
      { data: callBookingData, 
        school: guideInfo.school,
        email: sessionStorage.username, 
        guide_email: email });
      setCallBookingData({
        date: '',
        comments: ''
      });
      window.location.href = "/thanks";
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.error('Error sending request:', error);
      alert('Error sending request. Please try again later');
    }
    return;
  };

  const handleBackClick = () => {
    navigate(`/find-guide?school=${encodeURIComponent(school)}`);
  };

  if (loading) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
        <div className="flex items-center m-24 mb-32 justify-center px-6 pt-14">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-4 !text-lg lg:!text-xl text-center"
          > 
            Something went wrong. Try again later :/
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen bg-gray-500 px-6 pt-40 pb-24">
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
      <div className="mt-16 flex items-center justify-center gap-x-6">
        <button
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-900"
        >
          &larr; &nbsp; Back to Guides
        </button>
      </div>
      <div className="bg-white shadow rounded-lg mt-8 max-w-5xl mx-auto p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 overflow-hidden">
        <img src={guideInfo?.profile_image_url} alt={`${guideInfo?.name}'s profile`} className="rounded-full w-36 h-36 object-cover border border-gray-300 mx-auto md:mx-0" />
        <div className="flex-1 overflow-hidden">
          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">{guideInfo?.name}</h2>
          <div className="flex justify-center md:justify-start space-x-4 p-2">
            {guideInfo?.greek_life && (
              <SportsBarIcon className="text-[#ca8a04]" />
            )}
            {guideInfo?.student_athlete && (
              <EmojiEventsIcon className="text-[#eab308]" />
            )}
            {guideInfo?.paid_internship && (
              <WorkIcon className="text-[#4d7c0f]" />
            )}
          </div>
          <div className="text-gray-700 text-center md:text-left">
            {guideInfo?.school && <p><strong className="font-bold">School:</strong> {guideInfo.school}</p>}
            {guideInfo?.hometown && <p><strong className="font-bold">Hometown:</strong> {guideInfo.hometown}</p>}
            {guideInfo?.grad_year && <p><strong className="font-bold">Graduation Year:</strong> {guideInfo.grad_year}</p>}
            {(guideInfo?.major || guideInfo?.secondary_major || guideInfo?.minor || guideInfo?.secondary_minor) && (
              <div className="mt-2">
                {guideInfo.major && <p><strong className="font-bold">Major:</strong> {guideInfo.major}</p>}
                {guideInfo.secondary_major && <p><strong className="font-bold">Other Major:</strong> {guideInfo.secondary_major}</p>}
                {guideInfo.minor && <p><strong className="font-bold">Minor:</strong> {guideInfo.minor}</p>}
                {guideInfo.secondary_minor && <p><strong className="font-bold">Other Minor:</strong> {guideInfo.secondary_minor}</p>}
              </div>
            )}
          </div>
          <div className="mt-4 text-center text-gray-700 py-2 md:text-left">
            {guideInfo?.activities && guideInfo.activities.length > 0 && (
              <>
                <h3 className="font-bold text-gray-900 text-lg">Campus Activities</h3>
                <ul className="list-inside tex-md space-y-1 overflow-hidden overflow-ellipsis">
                  {guideInfo.activities.map((activity, index) => (
                    <li key={index} className='my-2'>
                      <div className="overflow-wrap break-words">
                       <strong>• {activity.name}:</strong> {activity.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {guideInfo?.hobbies && guideInfo.hobbies.length > 0 && (
              <>
                <h3 className="font-bold text-gray-900 text-lg">Hobbies</h3>
                <ul className="list-inside text-md space-y-1 overflow-hidden overflow-ellipsis">
                  {guideInfo.hobbies.map((hobby, index) => (
                    <li key={index} className='my-2'>
                      <div className="overflow-wrap break-words">
                        <strong>• {hobby.name}:</strong> {hobby.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {guideInfo?.work_experience && guideInfo.work_experience.length > 0 && (
              <>
                <h3 className="font-bold text-gray-900 text-lg">Work Experience</h3>
                <ul className="list-inside tex-md space-y-1 overflow-hidden overflow-ellipsis">
                  {guideInfo.work_experience.map((exp, index) => (
                    <li key={index} className='my-2'>
                      <div className="overflow-wrap break-words">
                       <strong>• {exp.name}:</strong> {exp.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="mt-4 text-center md:text-left">
            {(guideInfo?.instagram || guideInfo?.linkedin) && (
              <h3 className="font-semibold text-lg">Socials</h3>
            )}
            <div className="text-gray-700">
              {guideInfo?.linkedin && (
                <a href={guideInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 ml-2 md:ml-0">
                  <button className="flex items-center hover:bg-gray-400 bg-gray-900 text-white mr-2 px-4 py-2 rounded-lg">
                    <Typography color="white">
                      <i className='fa-brands fa-linkedin' />
                      <strong> LinkedIn </strong>
                    </Typography>
                  </button>
                </a>
              )}
              {guideInfo?.instagram && (
                <a href={guideInfo.instagram} target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                  <button className="flex items-center hover:bg-gray-400 bg-gray-900 text-white px-4 py-2 rounded-lg">
                    <Typography color="white">
                      <i className='fa-brands fa-instagram' />
                      <strong> Instagram </strong>
                    </Typography>
                  </button>
                </a>  
              )}
            </div>
          </div>
          {guideInfo?.bio && (
            <div className="mt-4 text-center md:text-left overflow-hidden">
              <h3 className="font-semibold text-lg">Bio</h3>
              <p className="text-gray-700 overflow-wrap break-words">{guideInfo.bio}</p>
            </div>
          )}
          <div className="mt-6 text-center md:text-left">
            <button
              onClick={() => setShowSidebar(true)}
              className="bg-blue-600 m-2 text-white px-4 py-1 rounded-lg hover:bg-blue-900"
            >
              Request a Tour
            </button>
            <button
              onClick={() => setShowCallSidebar(true)}
              className="bg-blue-600 text-white m-2 px-4 py-1 rounded-lg hover:bg-blue-900"
            >
              Request a Video Chat
            </button>
          </div>
        </div>
      </div>

      <Sidebar
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        bookingData={tourBookingData}
        setBookingData={setTourBookingData}
        handleBookingSubmit={handleTourBookingSubmit}
        guideInfo={guideInfo}
      />
      <CallSidebar
        show={showCallSidebar}
        onClose={() => setShowCallSidebar(false)}
        bookingData={callBookingData}
        setBookingData={setCallBookingData}
        handleBookingSubmit={handleCallBookingSubmit}
        guideInfo={guideInfo}
      />
    </div>
  );
};

export default BookGuide;
