import Home from "@/pages/home";
import FindMatch from "@/pages/find-match";
import WhyTouredIt from "@/pages/why-touredit";


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

];

export default routes;
