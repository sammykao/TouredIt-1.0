import { Home, Profile, SignIn, SignUp, ContactUs } from "@/pages";
import SelectSchool from "./pages/find-match";

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
  {
    name: "Contact Us",
    path:  "/contact-us",
    element: <ContactUs />,
  },
  /*{
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },*/
];

export default routes;