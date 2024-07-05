import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";
import FindMatch from "./pages/find-match";
import Stats from "./pages/stats";




export const routes = [
  {
    name: "Find a match",
    path:  "/find-match",
    element: <FindMatch />,
  },
  {
    name: "hy TouredIt",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "Your Stats",
    path: "/your-stats",
    element: <Stats />,
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
  },
];

export default routes;
