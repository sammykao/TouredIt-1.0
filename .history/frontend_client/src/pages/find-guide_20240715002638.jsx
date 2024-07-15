import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Textarea, Input, Typography, Button } from "@material-tailwind/react";

const FindGuide = () => {
  const location = useLocation();
  const { school } = location.state || {};
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    school: '',
    major: '',
    grade: '',
    hobbies: '',
    clubs: '',
    interests: '',
    comments: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      if (!school) return; // If no school, do nothing

      try {
        const response = await axios.post('http://localhost:3001/api/allGuides', { school });
        setGuides(response.data.guides);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [school]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/sendMail', formData);
      console.log('Request submitted:', formData);
      setFormData({
        school: '',
        major: '',
        grade: '',
        hobbies: '',
        clubs: '',
        interests: '',
        comments: ''
      });
      alert('Your request has been submitted successfully!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('There was an error submitting your request. Please try again later.');
    }
  };

  const handleDetails = (email) => {
    navigate('/book-guide', { state: { email } }); // Navigate to GuideDetails page with email
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12 min-h-screen pb-24 bg-gray-500'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Guides for {school}
      </h1>

      {guides.length > 0 ? (
        <>
          {/* Display guides */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
            {guides.map((guide) => (
              <div
                key={guide.id}
                className='border shadow-lg rounded-lg hover:scale-105 duration-300 bg-white'
              >
                <div className='p-4'>
                  <p className='font-bold'>{guide.name}</p>
                  <p className='text-sm'>{guide.email}</p>
                  <p className='mt-2'>{guide.bio}</p>
                </div>
                <div className='flex justify-center p-4'>
                  <Button
                    onClick={() => handleDetails(guide.email)}
                    className="bg-blue-600 text-white rounded-lg"
                  >
                    Book Guide
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center">
            Couldn't find the guide you were looking for? Fill out this {' '}
            <button onClick={toggleForm} className="text-blue-600 underline">
              form
            </button>
            , and we will find a guide with similar details.
          </p>
          {showForm && (
            <div className="mt-4 p-6 bg-white border border-gray-300 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    School:
                  </Typography>
                  <Input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    Major:
                  </Typography>
                  <Input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    Grade:
                  </Typography>
                  <Input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    Hobbies:
                  </Typography>
                  <Input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    Clubs:
                  </Typography>
                  <Input
                    type="text"
                    name="clubs"
                    value={formData.clubs}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    Interests:
                  </Typography>
                  <Input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                    Additional Comments:
                  </Typography>
                  <Textarea
                    rows={4}
                    color="gray"
                    placeholder="Your comments here..."
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Request a Guide
                </Button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="w-full mb-6 text-center">
          <p>
            We will match you with a personalized guide. If you would like to tour {school}, 
            please fill out this form, and we will find a guide there for you based on your input.
          </p>
          <div className="mt-4 p-6 bg-white border border-gray-300 rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  School:
                </Typography>
                <Input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  Major:
                </Typography>
                <Input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  Grade:
                </Typography>
                <Input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  Hobbies:
                </Typography>
                <Input
                  type="text"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  Clubs:
                </Typography>
                <Input
                  type="text"
                  name="clubs"
                  value={formData.clubs}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  Interests:
                </Typography>
                <Input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                  Additional Comments:
                </Typography>
                <Textarea
                  rows={4}
                  color="gray"
                  placeholder="Your comments here..."
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Request a Guide
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindGuide;
