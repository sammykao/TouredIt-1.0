import React from 'react';
import { Textarea, Input, Typography, Button } from "@material-tailwind/react";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const GuideForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleSourceChange,
  handleAdditionalInfoChange,
  setFormData,
  toggleForm,
  showForm,
}) => (
  <div className="px-6 py-6 mt-12 rounded-lg max-w-4xl mx-auto">
    <Typography variant="h5" color="blue-gray" className="mt-4 text-center">
      Couldn't find the guide you were looking for? Fill out this {' '}
      <button onClick={toggleForm} className="text-blue-600 underline">
        form
      </button>
      , and we will find a guide with similar details.
    </Typography>
    {showForm && (
      <div className="mt-4 p-6 bg-white border border-gray-300 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="medium" className="mb-2 text-left font-medium !text-gray-900">
              *Please sign up or sign in before sending any booking requests*
            </Typography>
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
          {/* Other input fields for grade, hobbies, etc. */}
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
              Where did you hear about us?
            </Typography>
            <select
              label="Select Source"
              value={formData.source}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="mt-1 block py-2 w-full border-gray-900 rounded-md shadow-sm"
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
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                Please specify:
              </Typography>
              <Input
                type="text"
                name="additional_info"
                onChange={handleAdditionalInfoChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder={`Enter the ${formData.source === "College Counseling" ? "company name" : "ad platform"}`}
              />
            </div>
          )}
          {/* Other input fields for additional comments, etc. */}
          <div className="mb-4">
            <Typography variant="medium" className="mb-2 text-left font-medium !text-gray-900">
              Add Packages to Your Request:
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
                  <h2 className={`font-bold ${formData.greek_life ? 'text-white' : 'text-gray-900'}`}>Greek Life Experience</h2>
                  <p className={`text-sm my-2 ${formData.greek_life ? 'text-gray-200' : 'text-gray-900'}`}>
                    Spend an extra 30 minutes with your guide to learn about the Greek life on campus, the rush process, 
                    and see the guide's respective fraternity or sorority house(s).
                  </p>
                  <p className={`text-sm font-bold ${formData.greek_life ? 'text-white' : 'text-gray-700'}`}>+$50</p>
                </div>
              </div>
              {/* Similar blocks for Student Athlete Life and Internship Insights */}
            </div>
          </div>
          <Button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Request a Guide
          </Button>
        </form>
      </div>
    )}
  </div>
);

export default GuideForm;
