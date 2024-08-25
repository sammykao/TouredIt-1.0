import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from "@material-tailwind/react";
import { signIn, sendResetCode, ChangePassword } from "./../cognitoConfig";
import { Link } from 'react-router-dom';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (isResetMode && isCodeSent) {
      const { newPassword, confirmPassword } = formData;
      if (!passwordRegex.test(newPassword)) {
        return "Password must be at least 8 characters long and include at least one uppercase letter and one number.";
      }
      if (newPassword !== confirmPassword) {
        return "Passwords do not match.";
      }
    } else if (isResetMode && !isCodeSent) {
      const { email } = formData;
      const emailRegex = /\S+@\S+\.\S+/;
      if (!email || !emailRegex.test(email)) {
        return "Invalid email address";
      }
    } else {
      const { email, password } = formData;
      if (!email) {
        return "Please enter your email address";
      }
      if (!password) {
        return "Please enter your password";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }


    try {
      if (isResetMode) {
        const { email, code, newPassword } = formData;
        if (!isCodeSent) {
          await sendResetCode(email);
          setIsCodeSent(true);
          setError("");
        } else {
          await ChangePassword(email, newPassword, code);
          setError("");
          setIsResetMode(false);
          setIsCodeSent(false);
          setFormData({
            email: "",
            password: "",
            code: "",
            newPassword: "",
            confirmPassword: "",
          });
          window.location.reload();
        }
      } else {
        const { email, password } = formData;
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
        if (location.state && location.state.email && location.state.school) {
          navigate("/book-guide", { state: { email: location.state.email, school: location.state.school } });
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      setError(error.message || "Error processing request");
    }
  };

  return (
    <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen pb-24 bg-gray-500">
      <section className="mt-24 flex p-4 gap-4 bg-white rounded-3xl">
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              {isResetMode ? "Reset Password" : "Sign In"}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
              {isResetMode ? "Enter your email to receive a reset code." : "Enter your email and password to Sign In."}
            </Typography>
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
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                disabled={isCodeSent && isResetMode}
              />
              {isResetMode ? (
                <>
                  {isCodeSent && (
                    <>
                      <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                        Reset Code
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="Enter reset code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="m-1 !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                        New Password
                      </Typography>
                      <Input
                        type="password"
                        size="lg"
                        name="newPassword"
                        placeholder="********"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                        Confirm New Password
                      </Typography>
                      <Input
                        type="password"
                        size="lg"
                        name="confirmPassword"
                        placeholder="********"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
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
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </>
              )}
            </div>
            {error && <Typography variant="small" color="red" className="font-medium mt-2">{error}</Typography>}
            <Button className="mt-6" type="submit" fullWidth>
              {isResetMode ? (isCodeSent ? "Reset Password" : "Send Code") : "Sign In"}
            </Button>
            {!isResetMode && (
              <>
                <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                  <button type="button" className="text-gray-900 ml-1" onClick={() => setIsResetMode(true)}>
                    Forgot Password?
                  </button>
                </Typography>
                <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                  Not registered?
                  <Link to="/sign-up" className="text-gray-900 ml-1">Create account</Link>
                </Typography>
              </>
            )}
            {isResetMode && (
              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                <button type="button" className="text-gray-900 ml-1" onClick={() => {
                  setIsResetMode(false);
                  setIsCodeSent(false);
                }}>
                  Back to Sign In
                </button>
              </Typography>
            )}
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
