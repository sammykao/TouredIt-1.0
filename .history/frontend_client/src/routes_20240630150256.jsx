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
  
  /*{
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },*/
];

export default routes;
