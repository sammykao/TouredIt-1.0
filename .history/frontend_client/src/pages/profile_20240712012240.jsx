import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon, BriefcaseIcon, BuildingLibraryIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import axios from 'axios';

export function Profile() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = sessionStorage.username;

  useEffect(() => {
    axios.post("http://localhost:3001/api/accountInfo", { email })
      .then(response => {
        console.log(response);
        setAccountInfo(response.data.account);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen pb-24 bg-gray-500">
      {accountInfo ? (
        <>
          <p>Name: {accountInfo.name}</p>
          <p>Email: {accountInfo.email}</p>
          <p>Phone: {accountInfo.phone}</p>
          
        </>
      ) : (
        <p>No account information found.</p>
      )}
    </div>
  );
}

export default Profile;
