import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { signIn, sendResetCode, ChangePassword } from "./../cognitoConfig";

// Password validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming new password
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetCodeSent, setIsResetCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Error state for password validation
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Error state for password match

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;

    if (!email) {
      return "Please enter your email address";
    }
    
    if (!password) {
      return "Please enter your password";
    }
    
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, include one uppercase letter, and one number.");
      return "Invalid password";
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return "Passwords do not match";
    } else {
      setConfirmPasswordError("");
    }
    
    return "";
  };

  const validatePasswordReset = () => {
    if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password must be at least 8 characters long, include one uppercase letter, and one number.");
      return false;
    } else {
      setPasswordError("");
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
    }

    return true;
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
        confirmPassword: "",
      });
      setError("");
      // Redirect to dashboard or another page on successful sign-in
      // Check if there's a returnTo path in location state
      if (location.state && location.state.email && location.state.school) {
        navigate("/book-guide", { state: { email: location.state.email, school: location.state.school } });
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.message || "Error signing in");
    }
  };

  const handleSendResetCode = async () => {
    try {
      await sendResetCode(formData.email);
      setIsResetCodeSent(true);
      setError("");
    } catch (error) {
      setError(error.message || "Error sending reset code");
    }
  };

  const handleChangePassword = async () => {
    if (!validatePasswordReset()) {
      return;
    }

    try {
      await ChangePassword(formData.email, newPassword, resetCode);
      setIsResetCodeSent(false);
      setIsForgotPassword(false);
      setFormData({ email: "", password: "" });
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      console.log("Password reset successfully. You can now log in with your new password.");
    } catch (error) {
      setError(error.message || "Error changing password");
    }
  };

  return (
    <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen pb-24 bg-gray-500">
      <section className="mt-24 flex p-4 gap-4 bg-white rounded-3xl">
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              {isForgotPassword ? "Forgot Password" : "Sign In"}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
              {isForgotPassword ? "Enter your email to receive a reset code." : "Enter your email and password to Sign In."}
            </Typography>
          </div>
          <form onSubmit={isForgotPassword ? (isResetCodeSent ? handleChangePassword : handleSendResetCode) : handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
              {isForgotPassword && isResetCodeSent && (
                <>
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Reset Code
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter the reset code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    New Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {passwordError && <Typography variant="small" color="red" className="font-medium mt-2">{passwordError}</Typography>}
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Confirm New Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {confirmPasswordError && <Typography variant="small" color="red" className="font-medium mt-2">{confirmPasswordError}</Typography>}
                </>
              )}
            </div>
            {error && <Typography variant="small" color="red" className="font-medium mt-2">{error}</Typography>}
            <Button className="mt-6" type="submit" fullWidth>
              {isForgotPassword ? (isResetCodeSent ? "Change Password" : "Send Reset Code") : "Sign In"}
            </Button>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              {isForgotPassword ? (
                <span onClick={() => setIsForgotPassword(false)} className="cursor-pointer text-gray-900">
                  Remembered your password? Sign In
                </span>
              ) : (
                <>
                  Forgot your password?{" "}
                  <span onClick={() => setIsForgotPassword(true)} className="cursor-pointer text-gray-900">
                    Reset Password
                  </span>
                </>
              )}
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
