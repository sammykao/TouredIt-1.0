import { Home, findMatch} from "@/pages";
import SelectSchool from "./pages/select-school";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Find a Match",
    path: "/findMatch",
    element: <findMatch />,
  }
];

export default routes;
