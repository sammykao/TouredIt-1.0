import React, { useState } from 'react';
import { Textarea, Input, Typography, Button } from "@material-tailwind/react";

const CallGuideForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleSourceChange,
  handleAdditionalInfoChange,
  showForm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state

  // Modify handleSubmit to trigger loading animation
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    try {
      await handleSubmit(e); // Call the original handleSubmit
    } finally {
      setIsSubmitting(false); // Stop loading when submit completes
    }
  };

  return (
    <div className="px-4 py-4 rounded-lg max-w-4xl mx-auto sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {showForm && (
        <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg sm:p-6">
          <form onSubmit={handleFormSubmit}>
            {/* Existing form fields */}
            <div className="mb-4">
              <Typography className="mb-2 font-bold text-gray-900">$50 - 45 Minutes</Typography>
              <Typography variant="medium" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                *Please sign up or sign in before sending any booking*
              </Typography>
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
            <div className="mb-4">
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                Date:
              </Typography>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-4">
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                Where did you hear about us?
              </Typography>
              <select
                label="Select Source"
                value={formData.source}
                onChange={(e) => handleSourceChange(e.target.value)}
                className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
              >
                <option value="">Select an option</option>
                <option value="Social Media">Social Media</option>
                <option value="Google Search">Google Search</option>
                <option value="College Counseling">College Counseling Company</option>
                <option value="Ad">Ad</option>
                <option value="Other"> Other </option>
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
            <div className="mb-4">
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900 text-sm sm:text-base">
                Additional Comments:
              </Typography>
              <Textarea
                rows={4}
                color="gray"
                placeholder="Your comments here..."
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
              />
            </div>

            {/* Button or Loading Spinner */}
            {!isSubmitting ? (
              <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base">
                Request a Guide
              </Button>
            ) : (
              <div className="mt-2 px-4 py-2 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid"></div>
                <Typography variant="small" className="ml-2 text-blue-600 text-sm sm:text-base">Submitting...</Typography>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default CallGuideForm;
