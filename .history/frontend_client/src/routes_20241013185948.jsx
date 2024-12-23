import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";




export const routes = [
  {
    name: "Why TouredIt",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "Build a Trip",
    path: "/build-trip",
    element: "",
  },
  {
    name: "Contact Us",
    path:  "/contact-us",
    element: <ContactUs />,
  },
  {
    name: "Guide Portal",
    href: "https://www.toureditguides.com",
    element: "",
  }
];

export default routes;
