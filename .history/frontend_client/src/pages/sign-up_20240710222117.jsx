import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from 'axios';
import UserPool from './cognitoConfig';

export function SignUp() {
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

  const insertBackend = async () => {
    const { email, name } = formData;
    const phone = formData.phoneNumber;
    const newAccount = { email, name, phone };
    try {
      const response = await axios.post('http://localhost:3001/api/newClient', newAccount);
      console.log(response);
    } catch (error) {
      console.error('Error sending message:', error);
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
      console.log(password);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      console.log(validationError);
      setError(validationError);
      return;
    }

    const { email, password, name, phoneNumber } = formData;

    const attributeList = [];
    attributeList.push(new CognitoUserAttribute({
      Name: 'email',
      Value: email
    }));
    attributeList.push(new CognitoUserAttribute({
      Name: 'phone_number',
      Value: phoneNumber
    }));
    attributeList.push(new CognitoUserAttribute({
      Name: 'name',
      Value: name
    }));

    UserPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      setMessage("Registration successful! Please check your email for the verification code.");
      setIsVerifying(true);
      setError("");
    });
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const { email, verificationCode } = formData;

    const userData = {
      Username: email,
      Pool: UserPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      setMessage("Verification successful! You can now sign in.");
      insertBackend();
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
    });
  };

  const handleResendCode = async () => {
    const { email } = formData;

    const userData = {
      Username: email,
      Pool: UserPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      setMessage("Verification code resent. Please check your email.");
    });
  };

  return (
    <section className="m-8 flex">
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
            </div>
            <Checkbox
              color="green"
              text="I agree the Terms and Conditions"
              id="terms"
              name="terms"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {error && <Typography color="red">{error}</Typography>}
            {message && <Typography color="green">{message}</Typography>}
            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                Sign In
              </Link>
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
                placeholder="Enter your verification code"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleInputChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {error && <Typography color="red">{error}</Typography>}
            {message && <Typography color="green">{message}</Typography>}
            <Button className="mt-6" fullWidth type="submit">
              Verify
            </Button>
            <Button className="mt-6" fullWidth onClick={handleResendCode}>
              Resend Code
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
