import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { signIn } from "./../cognitoConfig";

export function SignIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email) {
      return "Please enter your email address";
    }
    if (!password) {
      return "Please enter your password";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const { email, password } = formData;

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
      setFormData({
        email: "",
        password: "",
      });
      setError("");
      // Redirect to dashboard or another page on successful sign-in
      navigate("/profile");
    } catch (error) {
      if (error.message === 'User is not confirmed.') {
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

  return (
    <div className="relative isolate px-6 pt-16 lg:px-8 pb-24 bg-gray-100">
    <section className="w-full mt-36 flex p-4 bg-gray-100 rounded-3xl mx-auto">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
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
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {error && <Typography variant="small" color="red" className="font-medium mt-2">{error}</Typography>}
          <Button className="mt-6" type="submit" fullWidth>
            Sign In
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/guide-sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="./../../public/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Pattern"
        />
      </div>
    </section>
    </div>
  );
}

export default SignIn;