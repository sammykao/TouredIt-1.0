import { Input, Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import majors from '../majors.json';
import grad_years from '../grad_years.json';


const ProfileForm = ({
    handleSubmit, 
    postData, 
    handleInputChange, 
    handleSchoolChange, 
    handleSchoolSelect, 
    filteredSchools, 
    selectedSchool,
    handleFileChange, 
    hobbyData, 
    handleHobbyChange, 
    handleAddHobby, 
    handleRemoveHobby, 
    activityData, 
    handleActivityChange, 
    handleAddActivity, 
    handleRemoveActivity, 
    expData, 
    handleWorkExpChange, 
    handleAddWorkExp, 
    handleRemoveWorkExp, 
    isChecked, 
    setIsChecked, 
    error, 
    message, 
    handleCheckboxChange
}) => {


    
    const renderMajorOptions = () => {
        const sortedMajors = Object.values(majors).flat().sort();

        return sortedMajors.map((major) => (
            <option key={major} value={major}>{major}</option>
        ));
    };

    const renderGradYearOptions = () => {
        return grad_years.grad_years.map((year) => (
            <option key={year} value={year}>
            {year}
            </option>
        ));
    };


    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg ">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Name*
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={postData.name}
                    onChange={handleInputChange}
                    required
                />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                    Email*
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="email"
                    type="text"
                    placeholder="name@mail.com"
                    value={postData.email}
                    onChange={handleInputChange}
                    required
                />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full  px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="school">
                    School (Official Name)*
                </Typography>
                <Input
                    type="text"
                    value={selectedSchool}
                    onChange={handleSchoolChange}
                    name="school"
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Start typing to search for a school..."
                />
                {filteredSchools.length > 0 && (
                    <ul className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto bg-gray-200">
                    {filteredSchools.map((school, index) => (
                        <li
                        key={index}
                        onClick={() => handleSchoolSelect(school)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                        {school}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hometown">
                    Hometown (City, State)*
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="hometown"
                    type="text"
                    placeholder="Albuquerque"
                    value={postData.hometown}
                    onChange={handleInputChange}
                    required
                />
                </div>


                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                    Phone Number*
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="phone"
                    type="text"
                    placeholder="123-456-7890"
                    value={postData.phone}
                    onChange={handleInputChange}
                    required
                />
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"> Example: 555-555-5555</Typography>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bio">
                    A brief about you*
                </Typography>
                <Textarea
                    cols="40"
                    rows="5"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="bio"
                    type="text"
                    placeholder="~100 words"
                    value={postData.bio}
                    onChange={handleInputChange}
                    required
                >
                </Textarea>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="major">
                    Major*
                </Typography>
                <select
                    name="major"
                    value={postData.major}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                    <option value="">Select a major</option>
                    {renderMajorOptions()}
                </select>

                </div>
                <div className="w-full md:w-1/2 px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="minor">
                    Minor
                </Typography>
                <select
                    name="minor"
                    value={postData.minor}
                    onChange={handleInputChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                    <option value="">Choose Minor</option>
                    {renderMajorOptions()}
                </select>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_major">
                    Secondary Major
                </Typography>
                <select
                    name="secondary_major"
                    value={postData.secondary_major}
                    onChange={handleInputChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                    <option value="">Choose Second Major</option>
                    {renderMajorOptions()}
                </select>

                </div>
                <div className="w-full md:w-1/2 px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="secondary_minor">
                    Secondary Minor
                </Typography>
                <select
                    name="secondary_minor"
                    value={postData.secondary_minor}
                    onChange={handleInputChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                    <option value="">Second Minor</option>
                    {renderMajorOptions()}
                </select>
                </div>

                <div className="w-full px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grad_year">
                    Grad Year*
                </Typography>
                <select
                    name="grad_year"
                    value={postData.grad_year}
                    required
                    onChange={handleInputChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                    <option value="">Graduation Year</option>
                    {renderGradYearOptions()}
                </select>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="instagram">
                    Instagram Url (Not Username)
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    name="instagram"
                    type="text"
                    placeholder="toured.it"
                    value={postData.instagram}
                    onChange={handleInputChange}
                />
                </div>
                <div className="w-full md:w-1/2 px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="linkedin">
                    LinkedIn Url (Not Username)
                </Typography>
                <Input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="linkedin"
                    type="text"
                    placeholder="TouredIt"
                    value={postData.linkedin}
                    onChange={handleInputChange}
                />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Profile Picture*
                </Typography>
                <Input
                    name="profile_image_url"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <Typography className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="grid-last-name">
                    Hobbies, activities, and work experience (internships too) are critical parts in how guides 
                    are selected to give tours. We want to match tourees with the most compatible guide.
                    You will have the opportunity to add additional ones or edit them later on in your portal.
                </Typography>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <Typography className="w-full text-gray-700 text-xs font-bold mb-2">
                Selecting the following options will enroll you in TouredIt's additional packaged tours. 
                Be sure to specify your connection to these packages in the hobbies or on-campus activities 
                section of your profile. For more details on each option, hover over the information icon 
                associated with the package.
                </Typography>
                <div className="flex flex-wrap -mx-3 mb-6">

                <div className="w-full px-3 mb-6">
                    <Disclosure>
                    {({ open }) => (
                        <>
                        <DisclosureButton className="flex justify-between w-full text-left">
                            <Checkbox
                            name="greek_life"
                            label="Greek Life"
                            checked={postData.greek_life}
                            onChange={handleCheckboxChange}
                            />
                            {open ? (
                            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 px-4">
                        To opt into this package, you must be an active member 
                        of Greek Life. This package offers an additional $25 and 
                        requires an extra 30 minutes beyond the standard tour. You 
                        will be responsible for showing families who select this package 
                        your respective fraternity or sorority house, providing insights 
                        on the rushing process and Greek Life, and answering any related 
                        questions they may have. Please indicate more about your 
                        experience in Greek Life within your on-campus activities 
                        section on your profile!
                        </DisclosurePanel>
                        </>
                    )}
                    </Disclosure>
                </div>

                <div className="w-full px-3 mb-6">
                    <Disclosure>
                    {({ open }) => (
                        <>
                        <DisclosureButton className="flex justify-between w-full text-left">
                            <Checkbox
                            name="student_athlete"
                            label="Student Athlete"
                            checked={postData.student_athlete}
                            onChange={handleCheckboxChange}
                            />
                            {open ? (
                            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 px-4">
                        To opt into this package, you must be a varsity student-athlete at your 
                        school. This package offers an additional $25 and requires an extra 30 minutes 
                        beyond the standard tour. You will be responsible for showing the athletic 
                        facility along with the building where you practice and play your sport. You 
                        will also be required to give insights into the recruiting process and answer 
                        any questions the family may have. Please indicate more about your experience 
                        as a student-athlete within your on-campus activities section on your profile!
                        </DisclosurePanel>
                        </>
                    )}
                    </Disclosure>
                </div>

                <div className="w-full px-3 mb-6">
                    <Disclosure>
                    {({ open }) => (
                        <>
                        <DisclosureButton className="flex justify-between w-full text-left">
                            <Checkbox
                            name="paid_internship"
                            label="Paid Internship"
                            checked={postData.paid_internship}
                            onChange={handleCheckboxChange}
                            />
                            {open ? (
                            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 px-4">
                        To opt into this package, you must have completed a paid internship. 
                        This package offers an additional $20 and requires an extra 30 minutes 
                        beyond the standard tour. You will be responsible for talking extensively 
                        about your internship and how you achieved it. This includes giving insights 
                        into the recruiting process, how to get set up in the field you are pursuing, 
                        and any tips to get started with Freshman year classes. Please indicate more 
                        about your paid internship within your work experience section on your profile!
                        </DisclosurePanel>
                        </>
                    )}
                    </Disclosure>
                </div>
                </div>
                
            </div>

            <div>
                {hobbyData.map((hobby, index) => (
                <div key={index} className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hobby_name">
                        Hobby Name:
                    </Typography>
                    <Input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="hobby_name"
                        type="text"
                        placeholder="Name"
                        value={hobby.hobby_name}
                        onChange={(e) => handleHobbyChange(index, e)}
                        required
                    />
                    </div>
                    <div className="w-full md:w-1/2">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                        Description:
                    </Typography>
                    <Textarea
                        cols="40"
                        rows="3"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="description"
                        type="text"
                        placeholder="~50 words maximum"
                        value={hobby.description}
                        onChange={(e) => handleHobbyChange(index, e)}
                        required
                    />
                    </div>
                    <div className="w-full flex justify-end items-center mt-2 space-x-2">
                    {hobbyData.length > 1 && (
                        <Button color="red" onClick={() => handleRemoveHobby(index)} className="py-3 px-3">
                        Remove Hobby
                        </Button>
                    )}
                    {index === hobbyData.length - 1 && (
                        <Button onClick={handleAddHobby} className="py-3 px-3">
                        Add Hobby
                        </Button>
                    )}
                    </div>
                </div>
                ))}
                {hobbyData.length === 0 && (
                <div className="w-full flex justify-end mt-2">
                    <Button onClick={handleAddHobby} className="py-3 px-3">
                    Add Hobby
                    </Button>
                </div>
                )}
            </div>


            <div>
                {activityData.map((activity, index) => (
                <div key={index} className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="activity_name">
                        On-campus activities:
                    </Typography>
                    <Input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="activity_name"
                        type="text"
                        placeholder="Name"
                        value={activity.activity_name}
                        onChange={(e) => handleActivityChange(index, e)}
                        required
                    />
                    </div>
                    <div className="w-full md:w-1/2">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                        Description:
                    </Typography>
                    <Textarea
                        cols="40"
                        rows="3"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="description"
                        type="text"
                        placeholder="~50 words maximum"
                        value={activity.description}
                        onChange={(e) => handleActivityChange(index, e)}
                        required
                    />
                    </div>
                    <div className="w-full flex justify-end items-center mt-2 space-x-2">
                    {activityData.length > 1 && (
                        <Button color="red" onClick={() => handleRemoveActivity(index)} className="py-3 px-3">
                        Remove Activity
                        </Button>
                    )}
                    {index === activityData.length - 1 && (
                        <Button onClick={handleAddActivity} className="py-3 px-3">
                        Add Activity
                        </Button>
                    )}
                    </div>
                </div>
                ))}
                {activityData.length === 0 && (
                <div className="w-full flex justify-end mt-2">
                    <Button onClick={handleAddActivity} className="py-3 px-3">
                    Add Activity
                    </Button>
                </div>
                )}
            </div>

            
            <div>
                {expData.map((exp, index) => (
                <div key={index} className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="job_name">
                        Work Experience Name:
                    </Typography>
                    <Input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="job_name"
                        type="text"
                        placeholder="Name"
                        value={exp.job_name}
                        onChange={(e) => handleWorkExpChange(index, e)}
                        required
                    />
                    </div>
                    <div className="w-full md:w-1/2">
                    <Typography className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                        Description:
                    </Typography>
                    <Textarea
                        cols="40"
                        rows="3"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="description"
                        type="text"
                        placeholder="~50 words maximum"
                        value={exp.description}
                        onChange={(e) => handleWorkExpChange(index, e)}
                        required
                    />
                    </div>
                    <div className="w-full flex justify-end items-center mt-2 space-x-2">
                    {expData.length > 1 && (
                        <Button color="red" onClick={() => handleRemoveWorkExp(index)} className="py-3 px-3">
                        Remove Experience
                        </Button>
                    )}
                    {index === expData.length - 1 && (
                        <Button onClick={handleAddWorkExp} className="py-3 px-3">
                        Add Experience
                        </Button>
                    )}
                    </div>
                </div>
                ))}
                {expData.length === 0 && (
                <div className="w-full flex justify-end mt-2">
                    <Button onClick={handleAddWorkExp} className="py-3 px-3">
                    Add Work Experience
                    </Button>
                </div>
                )}
            </div>


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
                    I agree the Terms and Conditions
                    </Typography>
                )
                }
                containerProps={{ className: "-ml-2.5" }}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
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
            {error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
            {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
            <Button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Submit
            </Button>
        </form>
    );


};


export default ProfileForm;