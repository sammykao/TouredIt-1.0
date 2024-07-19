import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

const BookGuide = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [guideInfo, setGuideInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
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
        const response = await axios.post('http://localhost:3001/api/guideInfo', { email });
        setGuideInfo(response.data.guide);
        const newImageUrl = `http://localhost:3001/images/${response.data.guide.profile_image_url}`;
        setImageUrl(newImageUrl);
      } catch (err) {
        setError('Error fetching guide information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideInfo();
  }, [email]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingData.date && bookingData.comments) {
      alert(`Booking confirmed for ${bookingData.date} with comments: ${bookingData.comments}`);
      setShowBookingForm(false);
      setBookingData({ date: '', comments: '' });
    } else {
      alert('Please fill out all fields.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent h-8 w-8" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
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
      <div className="bg-white mt-24 shadow rounded-lg max-w-5xl mx-auto p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <img src={imageUrl} alt={`${guideInfo?.name}'s profile`} className="rounded-full w-36 h-36 border border-gray-300 mx-auto md:mx-0" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">{guideInfo?.name}</h2>
          <div className="text-gray-700 text-center md:text-left">
            {guideInfo?.school && <p><strong className="font-bold">School:</strong> {guideInfo.school}</p>}
            {guideInfo?.hometown && <p><strong className="font-bold">Hometown:</strong> {guideInfo.hometown}</p>}
            {(guideInfo?.major || guideInfo?.secondary_major || guideInfo?.minor || guideInfo?.secondary_minor) && (
              <div className="mt-2">
                {guideInfo.major && <p><strong className="font-bold">Major:</strong> {guideInfo.major}</p>}
                {guideInfo.secondary_major && <p><strong className="font-bold">Other Major:</strong> {guideInfo.secondary_major}</p>}
                {guideInfo.minor && <p><strong className="font-bold">Minor:</strong> {guideInfo.minor}</p>}
                {guideInfo.secondary_minor && <p><strong className="font-bold">Other Minor:</strong> {guideInfo.secondary_minor}</p>}
              </div>
            )}
          </div>
          <div className="mt-4 text-center text-gray-700 md:text-left">
            {guideInfo?.activities[0] && (
              <>
                <p className="font-bold">Campus Activities</p>
                <ul className="list-disc list-inside">
                  {guideInfo.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </>
            )}
            {guideInfo?.hobbies[0] && (
              <>
                <p className="font-bold">Hobbies</p>
                <ul className="list-disc list-inside">
                  {guideInfo.hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
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
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-semibold text-lg">Bio</h3>
              <p className="text-gray-700">{guideInfo.bio}</p>
            </div>
          )}
          <div className="mt-6 text-center md:text-left">
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
            >
              Book Me
            </button>
          </div>
          {showBookingForm && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
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
                    row="6"
                    onChange={(e) => setBookingData({ ...bookingData, comments: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                    required
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BookGuide;
