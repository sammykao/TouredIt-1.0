import Home from "./pages/home";
import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";
import SelectSchool from "./pages/select-school";





export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "why touredit",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "Find a match",
    path:  "/select-school",
    element: <SelectSchool />,
  },
  {
    name: "Contact Us",
    path:  "/contact-us",
    element: <ContactUs />,
  },
  /*{
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },*/
];

export default routes;
