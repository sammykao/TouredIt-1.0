import { Home, FindMatch, WhyTouredIt, Guides, SignIn, SignUp} from "@/pages";

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
    name: "Guides",
    path: "/guides",
    element: <Profile />,
  }
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  }

];

export default routes;
