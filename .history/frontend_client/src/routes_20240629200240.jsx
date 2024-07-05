import { Home, Profile } from "@/pages";

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
    name: "why touredit?",
    path: "/find-match",
    element: <Profile />,
  },
  {
    name: "Guides",
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
];

export default routes;
