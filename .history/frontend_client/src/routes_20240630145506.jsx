import Home from "@/pages/home";
import FindMatch from "@/pages/find-match";
import WhyTouredIt from "@/pages/why-touredit";
import ContacUs from "@/pages/contact-us";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "find your match",
    path: "/find-match",
    element: <FindMatch />,
  },
  {
    name: "why touredit",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "contact us",
    path: "/contact-us",
    element: <ContactUs />,
  },
];

export default routes;
