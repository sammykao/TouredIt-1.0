mport React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Textarea, Input, Typography, Button, Select, Option } from "@material-tailwind/react";

// Import the categories and majors data
import categoriesData from './categoriesData.json';

const FindGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { school } = location.state || {};
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    school: '',
    major: '',
    grade: '',
    hobbies: '',
    clubs: '',
    interests: '',
    comments: ''
  });

  useEffect(() => {
    const fetchGuides = async () => {
      if (!school) return;

      try {
        const response = await axios.post('http://localhost:3001/api/allGuides', { school });
        setGuides(response.data.guides);
        setFilteredGuides(response.data.guides);
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
      await axios.post('http://localhost:3001/api/sendCustomRequest', formData);
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
    navigate('/book-guide', { state: { email } });
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value === '') {
      setFilteredGuides(guides);
    } else {
      const majorsInCategory = categoriesData[value];
      const filtered = guides.filter(guide => 
        majorsInCategory.some(major => 
          guide.major.toLowerCase().includes(major.toLowerCase())
        )
      );
      setFilteredGuides(filtered);
    }
  };

  if (loading) {
    return (
      <div className="relative isolate flex items-center justify-center px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
        {/* Loading spinner code... */}
      </div>
    );
  }

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
      {/* Background styling div... */}
      <h2 className="text-3xl font-bold mb-4 text-center mt-32 justify-center">Guides for {school}</h2>
      
      {guides.length > 0 ? (
        <>
          <div className="mb-4 max-w-md mx-auto">
            <Select
              label="Filter by Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <Option value="">All Categories</Option>
              {Object.keys(categoriesData).map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>
          
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className='border shadow-lg rounded-lg hover:scale-105 duration-300 bg-white'
              >
                <div className='p-4'>
                  <img src={guide.profile_image_url} alt={guide.name} />
                  <p className='font-bold'>{guide.name}</p>
                  <p className='text-sm'>{guide.major}</p>
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
          
          {/* Form for requesting a guide... */}
        </>
      ) : (
        <div className="bg-white px-6 py-6 m shadow rounded-lg border max-w-4xl mx-auto">
          {/* Form for requesting a guide when no guides are available... */}
        </div>
      )}
    </div>
  );
};

export default FindGuide;