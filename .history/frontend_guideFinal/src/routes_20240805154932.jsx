
import GuideSignUp from "./pages/guide_signup";
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
  },
  {
    name: "TouredIt Main Website",
    path: "https://www.touredit.com",
    element: ,
  }
  
];

export default routes;
