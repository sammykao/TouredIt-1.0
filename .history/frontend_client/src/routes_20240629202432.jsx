import { Home, Profile, FindMatch, WhyTouredIt, SignIn, SignUp} from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "find your match",
    path: "/find-match",
    element: <FindMatch />,
  },
  {
    name: "why touredit?",
    path: "/why-touredit",
    element: <WhyTouredIt />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Guides",
    path: "/find-match",
    element: <Profile />,
  }

];

export default routes;
