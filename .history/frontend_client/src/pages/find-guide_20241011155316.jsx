import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';
import GuideCard from './guideHelper/GuideCard';
import GuideFilters from './guideHelper/GuideFilters';
import GuideForm from './guideHelper/GuideForm';
import CallGuideForm from './guideHelper/callGuideForm';
import { Helmet } from 'react-helmet';
import ShareButtons from '@/tools/widgets/socialbuttons';
import { isAuthenticated } from "./../tools/auth/loggedIn";
import categoriesData from "./guideHelper/majors.json";

const FindGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const school = queryParams.get('school');
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [isGuideForm, setIsGuideForm] = useState(true); // Toggle state for form
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
            additionalInfo: '',
            referral_code: '',
        });
        window.location.href = "/thanks";
    } catch (error) {
        console.error('Error sending request:', error);
        alert('There was an error submitting your request. Please try again later.');
    }
  };

  const handleCallSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
        window.location.href = "/sign-up";
        return;
    } 
    try {
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/sendCustomCallRequest', { data: formData, email: sessionStorage.username });
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
            additionalInfo: '',
            referral_code: '',
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

  const toggleFormType = () => {
    setIsGuideForm(!isGuideForm); // Toggle between GuideForm and CallGuideForm
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

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-500">
      <Helmet>
        <title>{`${school}`}</title>
        <meta name="description" content={`Get a match for ${school}.`} />
      </Helmet>
      <div className="flex flex-col items-center mt-36">
        <img className="mb-4 rounded-lg" src={logo} alt="Logo" />
        <h2 className="text-3xl font-bold mb-4 text-center mt-4">Get a match for {school}</h2>
      </div>
      {guides.length > 0 ? (
        <>
          <div className="flex justify-center mt-4 mb-12">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!showForm}
                onChange={toggleForm}
              />
              <div className="w-60 h-10 sm:w-80 sm:h-12 bg-gray-200 rounded-2xl flex items-center transition-all duration-300">
                <div
                  className={`w-full h-full flex justify-center text-sm sm:text-md font-semibold items-center transition-all duration-400 ${
                    showForm ? 'bg-indigo-800 text-white' : 'bg-gray-300 text-gray-900'
                  } rounded-2xl`}
                >
                  Custom Form
                </div>
                <div
                  className={`w-full h-full flex justify-center text-sm sm:text-md font-semibold items-center transition-all duration-400 ${
                    showForm ? 'bg-gray-300 text-gray-900' : 'bg-indigo-800 text-white'
                  } rounded-2xl`}
                >
                  Popular Students
                </div>
              </div>
            </label>
          </div>
          {showForm ? (
            <>
              <div className="flex justify-center mt-12">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!isGuideForm}
                    onChange={toggleFormType}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isGuideForm ? 'Tour Request' : 'Video Chat Request'}
                  </span>
                </label>
              </div>

              {/* Container that holds both forms and adjusts height dynamically */}
              <div className="relative overflow-hidden transition-all duration-500 ease-in-out" style={{ minHeight: '400px' }}>
                {/* Guide Form */}
                <div
                  className={`transition-opacity duration-1000 ease-in-out transform ${
                    isGuideForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  {isGuideForm && (
                    <GuideForm 
                      formData={formData}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      handleSourceChange={handleSourceChange}
                      handleAdditionalInfoChange={handleAdditionalInfoChange}
                      setFormData={setFormData}
                      showForm={true} // Always show form when no guides are available
                    />
                  )}
                </div>

                {/* Call Guide Form */}
                <div
                  className={`transition-opacity duration-1000 ease-in-out transform ${
                    !isGuideForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  {!isGuideForm && (
                    <CallGuideForm 
                      formData={formData}
                      handleChange={handleChange}
                      handleSubmit={handleCallSubmit}
                      handleSourceChange={handleSourceChange}
                      handleAdditionalInfoChange={handleAdditionalInfoChange}
                      showForm={true} // Always show form when no guides are available
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
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
            </>
          )}
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <ShareButtons school={school} />
          </div>
        </>
      ) : (
        <div className="bg-white px-6 py-6 m shadow rounded-lg border max-w-4xl mx-auto">
          <div className="w-full mb-6 text-center">
            <p>
              We will pair you with a personalized match. If you would like to connect with a similar individual from {school}, please fill out this form, and we will find a student there for you based 
              on your input.
            </p>
            <div className="flex justify-center mt-12">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={!isGuideForm}
                  onChange={toggleFormType}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {isGuideForm ? 'Tour Request' : 'Video Chat Request'}
                </span>
              </label>
            </div>

            {/* Container that holds both forms and adjusts height dynamically */}
            <div className="relative overflow-hidden transition-all duration-500 ease-in-out" style={{ minHeight: '400px' }}>
              {/* Guide Form */}
              <div
                className={`transition-opacity duration-1000 ease-in-out transform ${
                  isGuideForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
                }`}
              >
                {isGuideForm && (
                  <GuideForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSourceChange={handleSourceChange}
                    handleAdditionalInfoChange={handleAdditionalInfoChange}
                    setFormData={setFormData}
                    showForm={true} // Always show form when no guides are available
                  />
                )}
              </div>

              {/* Call Guide Form */}
              <div
                className={`transition-opacity duration-1000 ease-in-out transform ${
                  !isGuideForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
                }`}
              >
                {!isGuideForm && (
                  <CallGuideForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleCallSubmit}
                    handleSourceChange={handleSourceChange}
                    handleAdditionalInfoChange={handleAdditionalInfoChange}
                    showForm={true} // Always show form when no guides are available
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindGuide;
