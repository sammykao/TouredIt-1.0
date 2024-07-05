import { Home, FindMatch, WhyTouredIt, ContactUs } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "find a match",
    path: "/find-match",
    element: <FindMatch />,
  },
  {
    name: "why touredit",
    path:  "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "contact us",
    path:  "/contact-us",
    element: <ContactUs />,
  },
];

export default routes;
