import { Home, ContactUs, FindMatch, WhyTouredIt } from "@/pages";
import fin from "@/pages/select-school";

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
    path:  "/why-touredit",
    element: <WhyTouredIt />,
  },
];

export default routes;
