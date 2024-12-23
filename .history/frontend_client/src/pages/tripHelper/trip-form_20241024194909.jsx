import React, { useState } from 'react';
import { Textarea, Input, Typography, Button } from "@material-tailwind/react";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import discountCodes from './../bookingHelper/discount_codes.json';

const TripForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleSourceChange,
  handleAdditionalInfoChange,
  setFormData,
  school,   // Passed in school prop
  schools   // List of schools for autocomplete
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
  const handleSchoolDateChange = (index, e, value) => {
    const newFields = [...schoolDateFields];
    if (value) {
      newFields[index]['school'] = value;  // Autocomplete selected value
    } else {
      const { name, value } = e.target;
      newFields[index][name] = value;
    }
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
      await handleSubmit(e, updatedFormData, schools);
    } finally {
      setIsSubmitting(false);  // Stop loading when submit completes
    }
  };

  return (
    <div className="rounded-lg max-w-4xl mx-auto sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg sm:p-6">
        <form onSubmit={handleFormSubmit}>

          {/* Display the passed in school as the first input (non-editable) */}
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
              School Name (cannot be changed):
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
              {index > 0 && (
                <>
                  {/* Autocomplete for additional schools */}
                  <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                    School Name:
                  </Typography>
                  <Autocomplete
                    options={schools}  // Pass the list of school options
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => handleSchoolDateChange(index, null, value)}  // Handle selected value
                    renderInput={(params) => <TextField {...params} label="Select School" variant="outlined" />}
                  />
                </>
              )}

              {/* Date Input */}
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
                <Button className="mt-4 py-2 px-3" color="red" onClick={() => handleRemoveSchool(index)}>
                  Remove School
                </Button>
              )}
            </div>
          ))}

          <Button className="mt-2 py-2 px-3" onClick={handleAddSchool}>
            Add Another School
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Send my request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TripForm;
