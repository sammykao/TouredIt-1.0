import React, { useState } from 'react';
import { Modal, Typography, Button, Checkbox, Input, Textarea } from "@material-tailwind/react";

export function GuideSignUp() {
  const [postData, setPostData] = useState({
    name: '',
    email: '',
    school: '',
    hometown: '',
    phone: '',
    bio: '',
    major: '',
    secondary_major: '',
    minor: '',
    secondary_minor: '',
    profile_image_url: '',
    instagram: '',
    linkedin: '',
    grad_year: '',
    greek_life: false,
    student_athlete: false,
    paid_internship: false,
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const [showGreekLifeInfo, setShowGreekLifeInfo] = useState(false);
  const [showAthleteInfo, setShowAthleteInfo] = useState(false);
  const [showInternshipInfo, setShowInternshipInfo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleOpenModal = (modalType) => {
    switch (modalType) {
      case 'greekLife':
        setShowGreekLifeInfo(true);
        break;
      case 'athlete':
        setShowAthleteInfo(true);
        break;
      case 'internship':
        setShowInternshipInfo(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = (modalType) => {
    switch (modalType) {
      case 'greekLife':
        setShowGreekLifeInfo(false);
        break;
      case 'athlete':
        setShowAthleteInfo(false);
        break;
      case 'internship':
        setShowInternshipInfo(false);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8 pb-12 bg-gray-100">
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true"></div>

        <div className="pt-24 mt-12 sm:pt-32 mb-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-900">We Want You</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Become a tour guide today
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-800">
                Tour guides make or break a tour. We are looking for enthusiastic and energetic guides who
                are excited to show off their campus and provide the meaningful tours they wished they had received.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-12">
          <form className="w-full max-w-lg">
            {/* Other form inputs... */}

            <div className="flex flex-wrap -mx-3 mb-6">
              <Typography className="w-full text-gray-700 text-xs font-bold mb-2">
                Selecting the following options will enroll you in TouredIt's additional packaged tours.
                Be sure to specify your connection to these packages in the hobbies or on-campus activities
                section of your profile. For more details on each option, click the information icon
                associated with the package.
              </Typography>

              <div className="w-full md:w-1/3 px-3 mb-6 flex items-start">
                <Checkbox
                  name="greek_life"
                  label="Greek Life"
                  checked={postData.greek_life}
                  onChange={handleCheckboxChange}
                />
                <Button
                  className="bg-black mt-3 ml-3 px-2 rounded-lg text-md text-blue-500"
                  onClick={() => handleOpenModal('greekLife')}
                >
                  ℹ️
                </Button>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 flex items-start">
                <Checkbox
                  name="student_athlete"
                  label="Student Athlete"
                  checked={postData.student_athlete}
                  onChange={handleCheckboxChange}
                />
                <Button
                  className="bg-black mt-3 ml-1 px-2 rounded-lg text-md text-blue-500"
                  onClick={() => handleOpenModal('athlete')}
                >
                  ℹ️
                </Button>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 flex items-start">
                <Checkbox
                  name="paid_internship"
                  label="Paid Internship"
                  checked={postData.paid_internship}
                  onChange={handleCheckboxChange}
                />
                <Button
                  className="bg-black mt-3 ml-1 px-2 rounded-lg text-md text-blue-500"
                  onClick={() => handleOpenModal('internship')}
                >
                  ℹ️
                </Button>
              </div>
            </div>

            {/* Modal for Greek Life Info */}
            <Modal
              size="sm"
              active={showGreekLifeInfo}
              toggler={() => handleCloseModal('greekLife')}
            >
              <div className="p-4">
                <Typography color="gray" className="font-medium">
                  Greek Life Information
                </Typography>
                <Typography color="gray" className="text-sm">
                  To opt into this package, you must be an active member of Greek Life. This package offers an additional $25 and requires an extra 30 minutes beyond the standard tour. You will be responsible for showing families who select this package your respective fraternity or sorority house, providing insights on the rushing process and Greek Life, and answering any related questions they may have. Please indicate more about your experience in Greek Life within your on-campus activities section on your profile.
                </Typography>
                <Button
                  color="red"
                  onClick={() => handleCloseModal('greekLife')}
                  className="mt-4"
                >
                  Close
                </Button>
              </div>
            </Modal>

            {/* Modal for Athlete Info */}
            <Modal
              size="sm"
              active={showAthleteInfo}
              toggler={() => handleCloseModal('athlete')}
            >
              <div className="p-4">
                <Typography color="gray" className="font-medium">
                  Student Athlete Information
                </Typography>
                <Typography color="gray" className="text-sm">
                  To opt into this package, you must be a varsity student-athlete at your school. This package offers an additional $25 and requires an extra 30 minutes beyond the standard tour. You will be responsible for showing the athletic facility along with the building where you practice and play your sport. You will also be required to give insights into the recruiting process and answer any questions the family may have. Please indicate more about your experience as a student-athlete within your on-campus activities section on your profile.
                </Typography>
                <Button
                  color="red"
                  onClick={() => handleCloseModal('athlete')}
                  className="mt-4"
                >
                  Close
                </Button>
              </div>
            </Modal>

            {/* Modal for Internship Info */}
            <Modal
              size="sm"
              active={showInternshipInfo}
              toggler={() => handleCloseModal('internship')}
            >
              <div className="p-4">
                <Typography color="gray" className="font-medium">
                  Paid Internship Information
                </Typography>
                <Typography color="gray" className="text-sm">
                  To opt into this package, you must have completed a paid internship. This package offers an additional $20 and requires an extra 30 minutes beyond the standard tour. You will be responsible for talking extensively about your internship and how you achieved it. This includes giving insights into the recruiting process, how to get set up in the field you are pursuing, and any tips to get started with Freshman year classes. Please indicate more about your paid internship within your work experience section on your profile.
                </Typography>
                <Button
                  color="red"
                  onClick={() => handleCloseModal('internship')}
                  className="mt-4"
                >
                  Close
                </Button>
              </div>
            </Modal>

            {/* Other form content such as input fields, password, submit button, etc. */}

            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={postData.password}
              onChange={handleInputChange}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="confirmPassword"
              value={postData.confirmPassword}
              onChange={handleInputChange}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Checkbox
              label={
                (
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree to the Terms and Conditions
                  </Typography>
                )
              }
              containerProps={{ className: "-ml-2.5" }}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {!isChecked && 
              <div className="mx-auto p-4 mb-20">
                <div className="pdf-viewer-container h-80">
                  <object data="./../../public/terms.pdf" type="application/pdf" width="100%" height="120%">
                    <p>Your browser does not support PDFs. <a href="./../../public/terms.pdf">Download the PDF</a>.</p>
                  </object>
                </div>
              </div>
            }

            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GuideSignUp;