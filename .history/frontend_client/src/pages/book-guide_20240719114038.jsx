import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BookGuide = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [guideInfo, setGuideInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
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
    <div className="relative isolate min-h-screen bg-gray-600 px-6 pt-40 pb-24">
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
      <div className="bg-white shadow rounded-lg max-w-5xl mx-auto p-6 flex space-x-6">
        <img src={imageUrl} alt={`${guideInfo?.name}'s profile`} className="rounded-full w-36 h-36 border border-gray-300" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{guideInfo?.name}</h2>
          <div className="text-gray-700">
            {guideInfo?.school && <p><strong>School:</strong> {guideInfo.school}</p>}
            {guideInfo?.hometown && <p><strong>Hometown:</strong> {guideInfo.hometown}</p>}
            {(guideInfo?.major || guideInfo?.secondary_major || guideInfo?.minor || guideInfo?.secondary_minor) && (
              <div className="mt-2">
                {guideInfo.major && <p><strong>Major:</strong> {guideInfo.major}</p>}
                {guideInfo.secondary_major && <p><strong>Secondary Major:</strong> {guideInfo.secondary_major}</p>}
                {guideInfo.minor && <p><strong>Minor:</strong> {guideInfo.minor}</p>}
                {guideInfo.secondary_minor && <p><strong>Secondary Minor:</strong> {guideInfo.secondary_minor}</p>}
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="text-gray-700">
              {guideInfo?.phone && <p><strong>Phone:</strong> {guideInfo.phone}</p>}
              {guideInfo?.email && <p><strong>Email:</strong> {guideInfo.email}</p>}
              {guideInfo?.instagram && (
                <p><strong>Instagram:</strong> <a href={guideInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{guideInfo.instagram}</a></p>
              )}
              {guideInfo?.linkedin && (
                <p><strong>LinkedIn:</strong> <a href={guideInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{guideInfo.linkedin}</a></p>
              )}
            </div>
          </div>
          {guideInfo?.bio && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Bio</h3>
              <p className="text-gray-700">{guideInfo.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookGuide;
