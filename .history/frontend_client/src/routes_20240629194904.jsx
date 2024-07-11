import { Home, Profile, S} from "@/pages";
import SelectSchool from "./pages/findMatch";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Find a Match",
    path: "/findMatch",
    element
  },
  {
    name: "Select School",
    path:  "/select-school",
    element: <SelectSchool />,
  },
];

export default routes;