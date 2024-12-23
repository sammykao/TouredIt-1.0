import { Input, Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import majors from '../majors.json';
import grad_years from '../grad_years.json';

const ProfileForm = ({
    handleSubmit, 
    postData, 
    setSelectedSchool,
    setFilteredSchools,
    setPostData,
    filteredSchools, 
    selectedSchool,
    isChecked, 
    setIsChecked, 
    error, 
    message, 
    
}) => {

    const handleSchoolChange = (e) => {
        const inputValue = e.target.value;
        setSelectedSchool(inputValue);
        if (inputValue) {
          const filtered = schools.filter((school) =>
            school.toLowerCase().includes(inputValue.toLowerCase())
          );
          setFilteredSchools(filtered);
        } else {
          setFilteredSchools([]);
        }
      };
    
    const handleSchoolSelect = (aSchool) => {
        setSelectedSchool(aSchool);
        setPostData((prevState) => ({
          ...prevState,
          school: aSchool,
        }));
        setFilteredSchools([]);
    };
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setPostData((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const validFileTypes = ['image/jpeg', 'image/png'];
        if (file && !validFileTypes.includes(file.type)) {
          alert('Only JPEG, JPG, and PNG files are allowed.');
          e.target.value = '';
          return;
        }
        setFile(file);
    };

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
        <div className="flex justify-center items-center">

        </div>
    );


};


export default ProfileForm;