import React, { useState } from 'react';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { signUp, confirmSignUp, resendConfirmationCode, signIn } from './../cognitoConfig';
import api_key from "./apiHelper/key.json";


export function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const insertBackend = async () => {
    const { email, name, phoneNumber } = formData;
    const newAccount = { email, name, phone: phoneNumber };
    try {
      const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/newClient', newAccount);
      return;
    } catch (error) {
      console.error('Error Inserting Account:', error);
      try {
        const response = await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/updateClient', newAccount);
        return;
      } catch (error) {
        console.error('Error Updating Account:', error);
      }
    }
    if (newsletter) {
      try {
        await axios.post('https://lera2ibwne.execute-api.us-east-2.amazonaws.com/api/addEmailToNewsletter', {
          email,
          api_key: api_key["api_key"],
        });
        console.log('Email added to the newsletter successfully');
      } catch (error) {
        console.error('Error adding email to newsletter:', error);
      }
    }
  };

  const validateForm = () => {
    const { email, phoneNumber, name, password, confirmPassword } = formData;
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[\d+\-]{10,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!email || !emailRegex.test(email)) {
      return "Invalid email address";
    }
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return "Invalid phone number";
    }
    if (!name) {
      return "Name is required";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, contain a number and an uppercase letter";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (!isChecked) {
      return "You must agree to the Terms and Conditions";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleNewsletterChange = (e) => {
    setNewsletter(e.target.checker);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { email, password, name, phoneNumber } = formData;

    try {
      insertBackend();
      await signUp(email, password, name, phoneNumber);
      setMessage("Registration successful! Please check your email for the verification code.");
      setIsVerifying(true);
      setError("");
    } catch (error) {
      if (error.message === 'User already exists') {
        try {
          await resendConfirmationCode({ username: email });
          setMessage("Account already exists but is not confirmed. Resending verification code.");
          setIsVerifying(true);
          setError("");
        } catch (resendError) {
          setError("Account already exists. Please sign in.");
        }
      } else {
        setError(error.message || JSON.stringify(error));
      }
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const { email, verificationCode, password } = formData;

    try {
      await confirmSignUp(email, verificationCode);
      setMessage("Verification successful! You can now sign in.");
      setFormData({
        email: "",
        phoneNumber: "",
        name: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
      });
      setIsVerifying(false);
      setError("");
      handleSignIn(email, password);
    } catch (error) {
      if (error.message == "User cannot be confirmed. Current status is CONFIRMED") {
        alert("You already have an account. Please login.");
        sendToSignIn();
      }
      setError(error.message || JSON.stringify(error));
    }
  };

  const handleResendCode = async () => {
    const { email } = formData;

    if (window.confirm("Are you sure you want to resend the confirmation code?")) {
        await resendConfirmationCode({ username: email });
        setMessage("Verification code resent. Please check your email.");
        setError("");
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const session = await signIn(email, password);
      if (session && typeof session.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', session.AccessToken);
        if (!sessionStorage.getItem('accessToken')) {
          console.error('Session token was not set properly.');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined.');
      }
      if (location.state && location.state.email && location.state.school) {
        navigate("/book-guide", { state: { email: location.state.email, school: location.state.school } });
      } else if (location.state && location.state.school) {
        navigate("/find-guide?school=${encodeURIComponent(school)}" );
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.message || "Error signing in");
    }
  };

  const sendToSignIn = async () => {
    try {
      if (location.state && location.state.email && location.state.school) {
        navigate("/sign-in", { state: { email: location.state.email, school: location.state.school } });
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen pb-24 bg-gray-500">
        <section className="mt-24 p-4 flex bg-white rounded-3xl">
          <div className="w-2/5 h-full hidden lg:block">
            <img
              src="./../../public/img/pattern.png"
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
            <div className="text-center">
              <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
            </div>
            {!isVerifying ? (
              <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Your email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Phone Number
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="123-456-7890"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Confirm Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
                  {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal leading-tight"
                      >
                        Sign me up for TouredIt's free newsletter to hear insights into college life across the country
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }} // Adjusted the margin-left for better spacing
                    checked={newsletter}
                    onChange={handleNewsletterChange}
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
                    onChange={handleCheckboxChange}
                  />
                </div>
                {!isChecked && 
                  <div className="mx-auto p-4 mb-20">
                    <div className="pdf-viewer-container h-80">
                      <object data="./../../public/terms.pdf" type="application/pdf" width="100%" height="120%">
                        <p>Your browser does not support PDFs. <a href="./../../public/terms.pdf">Download the PDF</a>.</p>
                      </object>
                    </div>
                  </div>
                }
                <Button className="mt-6" fullWidth type="submit">
                  Register
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Already have an account?{" "}
                  <Button
                    onClick={sendToSignIn}
                    className="font-medium p-2 text-blue-500 transition-colors hover:text-blue-700"
                    variant="text"
                  >
                    Sign In
                  </Button>
                </Typography>
              </form>
            ) : (
              <form onSubmit={handleVerification} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Verification Code
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="123456"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Button className="mt-6" fullWidth type="submit">
                  Verify Now
                </Button>
                {error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
                {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
                <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                  Didn't receive the code?
                  <Button variant="text" className="text-gray-900 ml-2" onClick={handleResendCode}>Resend Code</Button>
                </Typography>
              </form>
            )}
          </div>
        </section>
    </div>
  );
}

export default SignUp;
