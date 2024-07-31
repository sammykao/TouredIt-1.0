
import GuideSignUp from "./pages/guide_signup";
import Home from "@/pages/home";
import About from "@/pages/about";




export const routes = [
  {
    name: "About",
    path:  "/about",
    element: <About />,
  },
  {
    name: "Become A Guide",
    path: "/guide-sign-up",
    element: <GuideSignUp />,
  }
];

export default routes;
