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

  // Submit handler with school and date concatenation
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    // Concatenate school-date pairs into strings
    const schoolString = schoolDateFields.map(field => `${field.school} - ${field.date}`).join(', ');
    const dateString = schoolDateFields.map(field => `${field.school} - ${field.date}`).join(', ');

    // Update formData with concatenated school and date strings
    setFormData((prevData) => ({
      ...prevData,
      school: schoolString,
      date: dateString,
    }));

    try {
      await handleSubmit(e); // Call the original handleSubmit
    } finally {
      setIsSubmitting(false); // Stop loading when submit completes
    }
  };

  return (
    <div className="rounded-lg max-w-4xl mx-auto sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg sm:p-6">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <Typography className="mb-2 font-bold text-gray-900">$150 - 90 minutes per Tour</Typography>
          </div>

          {/* Multiple School and Date Fields */}
          {schoolDateFields.map((field, index) => (
            <div key={index} className="mb-4">
                <div className="mb-4">
                    <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                        Msajor:
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
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                Select School:
              </Typography>
              <select
                name="school"
                value={field.school} // Value from schoolDateFields
                onChange={(e) => handleSchoolDateChange(index, e)}  // Handle form change event
                className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                required
              >
                <option value="">Select a school</option>
                {schoolDropdown.map((school, i) => (
                  <option key={i} value={school}>
                    {school}
                  </option>
                ))}
              </select>

              <Typography variant="small" className="mt-4 mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                Date:
              </Typography>
              <Input
                type="date"
                name="date"
                value={field.date}
                onChange={(e) => handleSchoolDateChange(index, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                required
              />
              {schoolDateFields.length > 1 && (
                <Button className="mt-2" color="red" onClick={() => handleRemoveSchool(index)}>
                  Remove School
                </Button>
              )}
            </div>
          ))}

          <Button className="mt-2" onClick={handleAddSchool}>
            Add Another School
          </Button>

          {/* Other Form Fields */}
          <div className="mb-4">
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
            <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base">
              Request my itinerary
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
