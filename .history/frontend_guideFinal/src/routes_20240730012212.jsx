
import GuideSignUp from "./pages/guide_signup";
import Home from "@/pages/home"





export const routes = [
  {
    name: "About",
    path:  "/about",
    element: <Home />,
  },
  {
    name: "Become A Guide",
    path: "/guide-sign-up",
    element: <GuideSignUp />,
  }
];

export default routes;
