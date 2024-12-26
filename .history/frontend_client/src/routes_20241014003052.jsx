import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirect
import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";
import BuildTrip from "./pages/build-trip";
import { isAuthenticated } from "./tools/auth/loggedIn"; // Ensure this is correctly imported

// Create a wrapper component to handle authentication logic for BuildTrip
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate replace to="/sign-in" />;
};

export const routes = [
  {
    name: "Why TouredIt",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "Build a Trip",
    path: "/build-trip",
    element: <ProtectedRoute element={<BuildTrip />} />, // Use ProtectedRoute to handle authentication
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    name: "Guide Portal",
    href: "https://www.toureditguides.com",
    element: "", // Keep href as external link (not an element)
  },
];

export default routes;