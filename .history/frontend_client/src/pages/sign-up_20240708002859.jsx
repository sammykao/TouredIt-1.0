import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";


export function SignUp() {
  	
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    const { email, phoneNumber, name, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!email || !emailRegex.test(email)) {
      return "Invalid email address";
    }
    if (!phoneNumber) {
      return "Phone number is required";
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
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  r