import Home from "./pages/home";
import Profile from "./pages/profile";
import ContactUs from "./pages/contact-us";
import Home from "./pages/home";
import SelectSchool from "./pages/select-school";





export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Select School",
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
