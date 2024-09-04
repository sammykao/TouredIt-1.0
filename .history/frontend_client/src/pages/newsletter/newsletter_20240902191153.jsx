import { useState } from 'react';
import axios from 'axios';
import api_key from "./apiHelper/key.json";
import { Button } from "@material-tailwind/react";



export function Newsletter () {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/addEmailToNewsletter', {
            email,
            api_key: api_key["api_key"],
        });
    
        if (response.status === 201) {
            setMessage('Thank you for signing up!');
            setEmail('');
        } else if (response.status === 409) {
            setMessage('This email is already subscribed.');
        } else {
            setMessage('There was a problem signing up. Please try again.');
        }
        } catch (error) {
        setMessage('There was a problem signing up. Please try again.');
        }
    };

    return (
        
        <div className="bg-gray-200 sm:w-2/3 mx-auto rounded-xl py-8 sm:py-16 mt-4 mb-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Join Our Newsletter
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-600">
                Sign up for our newsletter and get insights into college campus life.
              </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:max-w-lg sm:flex sm:flex-col sm:items-center">
              <form onSubmit={handleSubmit} className="sm:flex w-full">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
                  placeholder="Enter your email"
                />
                <Button
                  type="submit"
                  className="mt-3 w-full bg-blue-800 text-white py-3 px-6 font-semibold shadow-sm hover:bg-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Sign Up
                </Button>
              </form>
              {message && <p className="mt-4 text-sm text-gray-900">{message}</p>}
            </div>
          </div>
        </div>
    );
}


export default Newsletter;