import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { isAuthenticated } from "./../tools/auth/loggedIn";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';



const Sidebar = ({ show, onClose, bookingData, setBookingData, handleBookingSubmit }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg transform ${
        show ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-bold">Request a Tour</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          &times;
        </button>
      </div>
      <div className="p-4">
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Date</label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Comments</label>
            <textarea
              value={bookingData.comments}
              onChange={(e) => setBookingData({ ...bookingData, comments: e.target.value })}
              className="w-full p-2 h-32 border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const BookGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, school } = location.state || {};
  const [guideInfo, setGuideInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    comments: ''
  });

  useEffect(() => {
    const fetchGuideInfo = async () => {
      if (!email) {
        setError('No email provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/guideInfo', { email });
        setGuideInfo(response.data.guide);
        console.log(response.data.guide);
      } catch (err) {
        setError('Error fetching guide information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideInfo();
  }, [email]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      window.location.href = "/sign-in";
      return;
    }
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/api/sendBookingRequest', 
      { data: bookingData, 
        school: guideInfo.school,
        email: sessionStorage.username, 
        guide_email: email });
      setBookingData({
        date: '',
        comments: ''
      });
      window.location.href = "/thanks";
    } catch (error) {
      setLoading(false);
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
        {/* Loading Spinner */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
        {/* Error Message */}
      </div>
    );
  }

  return (
    <div className={`relative isolate min-h-screen bg-gray-500 px-6 pt-40 pb-24 ${showSidebar ? 'overflow-hidden' : ''}`}>
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        {/* Background Design */}
      </div>
      <div className="mt-16 flex items-center justify-center gap-x-6">
        <button
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-900"
        >
          &larr; &nbsp; Back to Guides
        </button>
      </div>
      {!showSidebar && (
        <div className="absolute top-4 right-4">
          {/* Log-out Button or any other top-right content */}
        </div>
      )}
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
          {/* Guide Information */}
          <div className="mt-6 text-center md:text-left">
            <button
              onClick={() => setShowSidebar(true)}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-900"
            >
              Request a Tour
            </button>
          </div>
        </div>
      </div>

      <Sidebar
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        bookingData={bookingData}
        setBookingData={setBookingData}
        handleBookingSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default BookGuide;