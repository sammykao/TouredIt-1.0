import React, { useState } from 'react';
import { Textarea, Input, Typography, Button } from "@material-tailwind/react";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import discountCodes from './../bookingHelper/discount_codes.json';

const TripForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleSourceChange,
  handleAdditionalInfoChange,
  setFormData,
  school
  schools
}) => {

  const [discountCode, setDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state

  // State to manage multiple schools and dates
  const [schoolDateFields, setSchoolDateFields] = useState([{ school: '', date: '' }]);

  // Function to handle adding a new set of school-date fields
  const handleAddSchool = () => {
    setSchoolDateFields([...schoolDateFields, { school: '', date: '' }]);
  };

  // Function to handle changes to school and date fields
  const handleSchoolDateChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...schoolDateFields];
    newFields[index][name] = value;
    setSchoolDateFields(newFields);
  };

  // Remove a school-date pair
  const handleRemoveSchool = (index) => {
    const newFields = schoolDateFields.filter((_, i) => i !== index);
    setSchoolDateFields(newFields);
  };

  // Apply discount code logic
  const handleDiscountApply = (e) => {
    e.preventDefault();
    const discount = discountCodes[discountCode];
    if (discount) {
      let message = "Code: " + discountCode + ", Discount: " + discount;
      setFormData((prevData) => ({
        ...prevData,
        referral_code: message,
      }));
      setDiscountMessage(`Code is successful! A $${discount} discount will be applied to each tour request.`);
    } else {
      setDiscountMessage("Invalid discount code. Please try again.");
    }
  };

  const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start loading

        // Concatenate school-date pairs into strings
        const schoolString = schoolDateFields.map(field => `${field.school} - ${field.date}`).join(', ');
        const dateString = schoolDateFields.map(field => `${field.school} - ${field.date}`).join(', ');
        const schools = schoolDateFields.map(field => [field.school, field.date]);
        // Create the updated formData with concatenated school and date strings
        const updatedFormData = {
            ...formData,
            school: schoolString,
            date: dateString,
        };

        try {
            // Pass the updatedFormData directly to handleSubmit
            await handleSubmit(e, updatedFormData, schools); // Modify handleSubmit to accept updatedFormData
        } finally {
            setIsSubmitting(false);  // Stop loading when submit completes
        }
    };


  return (
    <div className="rounded-lg max-w-4xl mx-auto sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg sm:p-6">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <Typography className="mb-4 font-bold text-gray-900">$150 - 90 minutes per Tour</Typography>
            
          </div>
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              School:
            </Typography>
            <Input
              type="text"
              value={school}  // Use the passed-in school prop
              disabled        // Make it non-editable
              className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>
          {/* Multiple School and Date Fields */}
          {schoolDateFields.map((field, index) => (
            <div key={index} className="mb-4">
              { index > 0 && (


              )}
              
          ))}

          <Button className="mt-2 py-2 px-3" onClick={handleAddSchool}>
            Add Another School
          </Button>

          {/* Other Form Fields */}
          <div className="mb-4 mt-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Major:
            </Typography>
            <Input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
              required
            />
          </div>
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Grade:
            </Typography>
            <Input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Hobbies:
            </Typography>
            <Input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Clubs:
            </Typography>
            <Input
              type="text"
              name="clubs"
              value={formData.clubs}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Interests:
            </Typography>
            <Input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* How Did You Hear About Us Section */}
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Where did you hear about us?
            </Typography>
            <select
              value={formData.source}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            >
              <option value="">Select an option</option>
              <option value="Social Media">Social Media</option>
              <option value="Google Search">Google Search</option>
              <option value="College Counseling">College Counseling Company</option>
              <option value="Ad">Ad</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {(formData.source === "College Counseling" || formData.source === "Ad") && (
            <div className="mb-4">
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                Please specify:
              </Typography>
              <Input
                type="text"
                name="additional_info"
                onChange={handleAdditionalInfoChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                placeholder={`Enter the ${formData.source === "College Counseling" ? "company name" : "ad platform"}`}
              />
            </div>
          )}

          {/* Packages Section */}
          <div className="mb-4">
            <Typography variant="medium" className="my-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              Select the package(s), and we will follow up with which specific tours you would like to add packages to:
            </Typography>
            <div className="space-y-4">
              <div
                className={`border p-4 rounded-lg cursor-pointer flex items-center ${
                  formData.greek_life ? 'bg-blue-500 shadow border-blue-500' : 'bg-white border-gray-800'
                }`}
                onClick={() => setFormData({ ...formData, greek_life: !formData.greek_life })}
              >
                <SportsBarIcon className={`${formData.greek_life ? 'text-white' : 'text-[#ca8a04]'}`} />
                <div className="ml-4">
                  <h2 className={`font-bold ${formData.greek_life ? 'text-white' : 'text-gray-900'} text-sm sm:text-base`}>Greek Life Experience</h2>
                  <p className={`text-xs sm:text-sm my-2 ${formData.greek_life ? 'text-gray-200' : 'text-gray-900'}`}>
                    Spend an extra 30 minutes with your guide to learn about the Greek life on campus, the rush process, and see the guide's respective fraternity or sorority house(s).
                  </p>
                  <p className={`text-sm font-bold ${formData.greek_life ? 'text-white' : 'text-gray-700'}`}>+$50</p>
                </div>
              </div>

              <div
                className={`border p-4 rounded-lg cursor-pointer flex items-center ${
                  formData.student_athlete ? 'bg-blue-500 shadow border-blue-500' : 'bg-white border-gray-800'
                }`}
                onClick={() => setFormData({ ...formData, student_athlete: !formData.student_athlete })}
              >
                <EmojiEventsIcon className={`${formData.student_athlete ? 'text-white' : 'text-[#eab308]'}`} />
                <div className="ml-4">
                  <h2 className={`font-bold ${formData.student_athlete ? 'text-white' : 'text-gray-900'} text-sm sm:text-base`}>Student Athlete Life</h2>
                  <p className={`text-xs sm:text-sm my-2 ${formData.student_athlete ? 'text-gray-200' : 'text-gray-900'}`}>
                    Spend an extra 30 minutes with your guide to learn about the recruiting process, balancing academics and athletics, and see athlete facilities.
                  </p>
                  <p className={`text-sm font-bold ${formData.student_athlete ? 'text-white' : 'text-gray-700'}`}>+$50</p>
                </div>
              </div>

              <div
                className={`border p-4 rounded-lg cursor-pointer flex items-center ${
                  formData.paid_internship ? 'bg-blue-500 shadow border-blue-500' : 'bg-white border-gray-800'
                }`}
                onClick={() => setFormData({ ...formData, paid_internship: !formData.paid_internship })}
              >
                <WorkIcon className={`${formData.paid_internship ? 'text-white' : 'text-[#4d7c0f]'}`} />
                <div className="ml-4">
                  <h2 className={`font-bold ${formData.paid_internship ? 'text-white' : 'text-gray-900'} text-sm sm:text-base`}>Internship Insights</h2>
                  <p className={`text-xs sm:text-sm my-2 ${formData.paid_internship ? 'text-gray-200' : 'text-gray-900'}`}>
                    Spend an extra 30 minutes with your guide to learn about the internship recruitment process, how to get internships as a college student, and get resume/LinkedIn review tips.
                  </p>
                  <p className={`text-sm font-bold ${formData.paid_internship ? 'text-white' : 'text-gray-700'}`}>+$40</p>
                </div>
              </div>
            </div>
          </div>

          {/* Discount Code Section */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Discount Code</label>
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-t sm:rounded-l sm:rounded-t-none focus:outline-none text-sm sm:text-base"
              />
              <button
                onClick={handleDiscountApply}
                className="bg-blue-500 text-white px-4 py-2 rounded-b sm:rounded-r sm:rounded-b-none hover:bg-blue-600 text-sm sm:text-base"
              >
                Apply
              </button>
            </div>
            {discountMessage && (
              <Typography className="text-gray-800 font-bold mt-2 text-sm sm:text-base">{discountMessage}</Typography>
            )}
          </div>

          {/* Submit Button or Loading Spinner */}
          {!isSubmitting ? (
            <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Send my request
            </Button>
          ) : (
            <div className="mt-2 px-4 py-2 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid"></div>
              <Typography variant="small" className="ml-2 text-blue-600 text-sm sm:text-base">Submitting...</Typography>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TripForm;
