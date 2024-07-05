import WhyTouredIt from "./pages/why-touredit";
import ContactUs from "./pages/contact-us";
import FindMatch from "./pages/find-match";
import Stats from "./pages/stats";




export const routes = [
  {
    name: "Find a Match",
    path:  "/find-match",
    element: <FindMatch />,
  },
  {
    name: "Why TouredIt",
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
  },
];

export default routes;
