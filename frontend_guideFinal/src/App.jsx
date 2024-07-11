import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Profile from "@/pages/profile";
import GuideSignUp from "@/pages/guide_signup";
import Footer from "@/widgets/layout/footer"


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/profile') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/guide-sign-up" element={<GuideSignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!(pathname == '/profile' || pathname == '/guide-sign-up') && (
      <Footer />
      )
      }
      
    </>
  );
}

export default App;