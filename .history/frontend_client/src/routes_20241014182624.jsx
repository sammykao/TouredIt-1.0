import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirect
import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";



export const routes = [
  {
    name: "Why TouredIt",
    path: "/why-touredit",
    element: <WhyTouredIt />,
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
