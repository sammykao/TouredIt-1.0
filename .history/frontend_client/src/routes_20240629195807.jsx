import { Home, Profile } from "@/pages";
import SelectSchool from "./pages/select-school";

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
    name: "find your match",
    path: "/find-match",
    element: <Profile />,
  },
  {
    name: "find your match",
    path: "/find-match",
    element: <Profile />,
  },
  {
    name: "Select School",
    path:  "/select-school",
    element: <SelectSchool />,
  },
];

export default routes;
