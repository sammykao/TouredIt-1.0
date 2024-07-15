import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BookGuide = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [guideInfo, setGuideInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError('Error fetching guide information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideInfo();
  }, [email]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
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

      <div className="bg-white px-6 py-6 mt-24 shadow rounded-lg border max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Guide Details</h2>
        {guideInfo ? (
          <div className="mt-4">
            <img src={guideInfo.profile_image_url} alt={`${guideInfo.name}'s profile`} className="rounded-lg mb-4 w-full max-w-xs mx-auto" />
            <p><strong>Name:</strong> {guideInfo.name}</p>
            <p><strong>Email:</strong> {guideInfo.email}</p>
            <p><strong>School:</strong> {guideInfo.school}</p>
            <p><strong>Hometown:</strong> {guideInfo.hometown}</p>
            <p><strong>Phone:</strong> {guideInfo.phone}</p>
            <p><strong>Bio:</strong> {guideInfo.bio}</p>
            <p><strong>Major:</strong> {guideInfo.major}</p>
            <p><strong>Secondary Major:</strong> {guideInfo.secondary_major}</p>
            <p><strong>Minor:</strong> {guideInfo.minor}</p>
            <p><strong>Secondary Minor:</strong> {guideInfo.secondary_minor}</p>
            <p><strong>Instagram:</strong> <a href={guideInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{guideInfo.instagram}</a></p>
            <p><strong>LinkedIn:</strong> <a href={guideInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{guideInfo.linkedin}</a></p>
            <p><strong>Number of Tours:</strong> {guideInfo.num_tours}</p>
            <p><strong>Activities:</strong> {guideInfo.activities.join(', ')}</p>
            <p><strong>Hobbies:</strong> {guideInfo.hobbies.join(', ')}</p>
          </div>
        ) : (
          <p className="text-center">No guide information available.</p>
        )}
      </div>
      
      <div
        className="absolute inset-x-0 top-[calc(80%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(80%-40rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(15%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(15%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};

export default BookGuide;
