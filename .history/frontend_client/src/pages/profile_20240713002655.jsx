import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Button, Input } from "@material-tailwind/react";
import axios from 'axios';

export function Profile() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const email = sessionStorage.username;

  useEffect(() => {
    axios.post("http://localhost:3001/api/accountInfo", { email })
      .then(response => {
        setAccountInfo(response.data.account);
        setFormData(response.data.account);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [email]);

  const handleDeleteAccount = () => {
    axios.post("http://localhost:3001/api/deleteAccount", { email })
      .then(() => {
        sessionStorage.clear();
        window.location.href = "/home";
      })
      .catch(error => {
        console.error("Error deleting account:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditSave = () => {
    axios.post("http://localhost:3001/api/updateAccount", formData)
      .then(response => {
        setAccountInfo(response.data.updatedAccount);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("Error updating account:", error);
      });
  };

  if (loading) {
    return (
      <div className="relative isolate px-6 pt-24 lg:px-8 min-h-screen pb-24 bg-gray-500">
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <button type="button" variant='text' color='black' className="mt-24" disabled>
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          </svg>
          Processing...
        </button>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="relative isolate px-6 pt-24 lg:px-8 min-h-screen pb-24 bg-gray-500">
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
      {accountInfo ? (
        <div className="bg-white overflow-hidden mt-24 shadow rounded-lg border max-w-4xl mx-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Your Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your account info.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            {isEditing ? (
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      readOnly
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="text" color="blue-gray" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="gradient" color="green" size="sm" onClick={handleEditSave}>
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {accountInfo.name}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {accountInfo.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {accountInfo.phone}
                  </dd>
                </div>
              </dl>
            )}
            <div className="flex justify-end space-x-4 px-4 py-5 sm:px-6">
              <Button variant="text" color="blue-gray" size="sm" onClick={() => setIsEditing(true)}>
                Edit Info
              </Button>
              <Button variant="gradient" color="red" size="sm" onClick={() => setShowDeletePopup(true)}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>No account information found.</p>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h2>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <Button variant="text" color="blue-gray" size="sm" onClick={() => setShowDeletePopup(false)}>
                Cancel
              </Button>
              <Button variant="gradient" color="red" size="sm" onClick={handleDeleteAccount}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      <div
        className="absolute inset-x-0 top-[calc(80%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(80%-40rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(15%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(15%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}

export default Profile;
