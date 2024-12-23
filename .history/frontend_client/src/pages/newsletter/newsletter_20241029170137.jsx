import { useState } from 'react';
import axios from 'axios';
import api_key from "../apiHelper/key.json";
import { Button } from "@material-tailwind/react";

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting

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
            if (error.code === 409) {
                setMessage('This email is already subscribed.');
            } else {
                setMessage('There was a problem signing up. Please try again.');
            }
        } finally {
            setLoading(false); // Set loading back to false after submission
        }
    };

    return (
        <>
            <div className="bg-gray-200 sm:w-2/3 mx-auto rounded-xl py-8 sm:py-10 mt-4 mb-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Join Our Newsletter
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-gray-600">
                        Sign up for our newsletter and get insights into campus life around the country
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
                            className="w-full rounded-md border border-gray-300 px-5 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
                            placeholder="Enter your email"
                            disabled={loading} // Disable input while loading
                        />
                        <Button
                            type="submit"
                            className={`mt-3 w-full py-2 px-5 font-semibold shadow-sm hover:bg-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 ${loading ? 'bg-gray-400' : 'bg-blue-800 text-white'}`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'} {/* Show loading text */}
                        </Button>
                        </form>
                        {message && <p className="mt-4 text-sm text-gray-900">{message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Newsletter;
