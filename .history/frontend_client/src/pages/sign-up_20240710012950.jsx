import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import axios from 'axios';

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

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: formData.name
          },
          customAttributes: {
            name: formData.name,
            phone: formData.phoneNumber
          }
        }
      });

      setMessage("Registration successful! Please check your email for the verification code.");
      setIsVerifying(true);
      setError("");
    } catch (error) {
      setError(error.message || "Error registering user");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: formData.verificationCode
      });
      setMessage("Verification successful! You can now sign in.");
    } catch (error) {
      setError(error.message || "Error verifying user");
      return
    }
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
  };

  const handleResendCode = async () => {
    try {
      co
      await resendSignUpCode(formData.email);
      setMessage("A new verification code has been sent to your email.");
      setError("");
    } catch (error) {
      setError(error.message || "Error resending verification code");
    }
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
            {error && <Typography variant="small" color="red" className="font-medium mt-2">{error}</Typography>}
            {message && <Typography variant="small" color="green" className="font-medium mt-2">{message}</Typography>}
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  I agree the&nbsp;
                  <a
                    href="/why-touredit"
                    className="font-normal text-black transition-colors hover:text-gray-900 underline"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button type="submit" className="mt-6" fullWidth disabled={!isChecked}>
              Register Now
            </Button>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Already have an account?
              <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
            </Typography>
          </form>
        ) : (
          <form onSubmit={handleVerification} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Check Your Email For A Verification Code
              </Typography>
              <Input
                size="lg"
                placeholder="Verification Code"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleInputChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {error && <Typography variant="small" color="red" className="font-medium mt-2">{error}</Typography>}
            {message && <Typography variant="small" color="green" className="font-medium mt-2">{message}</Typography>}
            <Button type="submit" className="mt-6" fullWidth>
              Verify Now
            </Button>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Didn't receive the code?
              <Button className="text-gray-200 ml-1" onClick={handleResendCode}>Resend Code</Button>
            </Typography>
          </form>
        )}
      </div>
    </section>
  );
}

export default SignUp;
