import Home from "./pages/home";
import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";
import FindMatch from "./pages/find-match";





export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Find a match",
    path:  "/find-match",
    element: <FindMatch />,
  },
  {
    name: "why touredit",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "Contact Us",
    path:  "/contact-us",
    element: <ContactUs />,
  },
  {
    name: "Guide Portal",
    href: "https://www.touredit.com",
    element: "",
  },*/
];

export default routes;
