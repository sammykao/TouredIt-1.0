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
  }
];

export default routes;
