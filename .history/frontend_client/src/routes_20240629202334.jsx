import { Home, Profile, FindMatch, WhyTouredIt} from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "find your match",
    path: "/find-match",
    element: <Profile />,
  },
  {
    name: "why touredit?",
    path: "/find-match",
    element: <W />,
  },
  {
    name: "Guides",
    path: "/find-match",
    element: <Profile />,
  }

];

export default routes;
