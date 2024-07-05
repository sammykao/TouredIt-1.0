import { Home, Profile, SignIn, SignUp } from "@/pages";
import SelectSchool from "./pages/findMatch";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Find a Match",
    path: "/"
  },
  {
    name: "Select School",
    path:  "/select-school",
    element: <SelectSchool />,
  },
];

export default routes;
