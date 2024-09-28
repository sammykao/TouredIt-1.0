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


    )
};


export default Newsletter;