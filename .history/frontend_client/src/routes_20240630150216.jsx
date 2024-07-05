import { Home, ContactUs, FindMatch, WhyTouredit } from "@/pages";
import fin from "@/pages/select-school";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "find a match",
    path: "/find-match",
    element: <Profile />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Select School",
    path:  "/select-school",
    element: <SelectSchool />,
  },
  /*{
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },*/
];

export default routes;
