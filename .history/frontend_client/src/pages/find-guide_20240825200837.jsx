import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import GuideCard from './guideHelper/GuideCard';
import GuideFilters from './guideHelper/GuideFilters';
import GuideForm from './GuideForm';
import { Helmet } from 'react-helmet';
import ShareButtons from '@/tools/widgets/socialbuttons';

const FindGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get('school');
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    school: school,
    major: '',
    grade: '',
    hobbies: '',
    clubs: '',
    interests: '',
    comments: '',
    date: '',
    greek_life: false,
    student_athlete: false,
    paid_internship: false,
    source: '',
    additionalInfo: '',
    referral_code: '',
  });
  const logo = "https://touredit-logos.s3.us-east-2.amazonaws.com/" + school + "_logo.jpg";

  useEffect(() => {
    const fetchGuides = async () => {
      if (!school) return;

      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/allGuides', { school });
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
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSourceChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      source: value,
    }));
  };

  const handleAdditionalInfoChange = (e) => {
    const additionalInfo = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      additionalInfo: additionalInfo,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
        window.location.href = "/sign-up";
        return;
    } 
    try {
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendCustomRequest', { data: formData, email: sessionStorage.username });
        setFormData({
            school: school,
            major: '',
            grade: '',
            hobbies: '',
            clubs: '',
            interests: '',
            comments: '',
            date: '',
            greek_life: false,
            student_athlete: false,
            paid_internship: false,
            source: '',
            additionalInfo: ''
        });
        window.location.href = "/thanks";
    } catch (error) {
        console.error('Error sending request:', error);
        alert('There was an error submitting your request. Please try again later.');
    }
  };

  const handleDetails = (email) => {
    if (!isAuthenticated()) {
      navigate('/sign-up', { state: { email, school } });
    } else {
      navigate('/book-guide', { state: { email, school } });
    }
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
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
      <Helmet>
        <title>{`${school}`}</title>
        <meta name="description" content={`Find guides for ${school}.`} />
      </Helmet>
      <div className="flex flex-col items-center mt-36">
        <img className="mb-4 rounded-lg" src={logo} alt="Logo" />
        <h2 className="text-3xl font-bold mb-4 text-center mt-4">Guides for {school}</h2>
      </div>
      {guides.length > 0 ? (
        <>
          <GuideFilters 
            selectedCategory={selectedCategory} 
            handleCategoryChange={handleCategoryChange} 
          />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-4">
            {filteredGuides.map((guide) => (
              <GuideCard 
                key={guide.id} 
                guide={guide} 
                handleDetails={handleDetails} 
              />
            ))}
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <ShareButtons school={school} />
          </div>
          <GuideForm 
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSourceChange={handleSourceChange}
            handleAdditionalInfoChange={handleAdditionalInfoChange}
            setFormData={setFormData}
            toggleForm={toggleForm}
            showForm={showForm}
          />
        </>
      ) : (
        <div className="bg-white px-6 py-6 m shadow rounded-lg border max-w-4xl mx-auto">
          <div className="w-full mb-6 text-center">
            <p>
              We will match you with a personalized guide. If you would like to tour {school},
              please fill out this form, and we will find a guide there for you based on your input.
            </p>
            <GuideForm 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleSourceChange={handleSourceChange}
              handleAdditionalInfoChange={handleAdditionalInfoChange}
              setFormData={setFormData}
              toggleForm={toggleForm}
              showForm={showForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindGuide;
