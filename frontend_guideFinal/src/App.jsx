import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/tools/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Profile from "@/pages/profile";
import Account from "@/pages/account";
import UpdateHobbies from "@/pages/update-hobbies";
import UpdateActivities from "@/pages/update-activities";
import GuideSignUp from "@/pages/guide_signup";
import Footer from "@/tools/layout/footer";
import { isAuthenticated } from "./tools/auth/loggedIn";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/update-hobbies' || pathname == '/update-activities' || pathname == '/profile' || pathname == '/why-touredit') && (
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
        <Route path="/sign-in" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignIn />} />
        <Route path="/sign-up" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignUp />} />

        <Route path="/account" element={isAuthenticated() ?  <Account /> : <Navigate replace to="/home" />} />
        <Route path="/profile" element={isAuthenticated() ?  <Profile /> : <Navigate replace to="/home" />} />
        <Route path="/guide-sign-up" element={<GuideSignUp />} />
        <Route path="/update-hobbies" element={<UpdateHobbies />} />
        <Route path="/update-activities" element={<UpdateActivities />} />
      </Routes>
      {!(pathname == '/profile' || pathname == '/why-touredit' || pathname == '/update-hobbies') || pathname == '/update-activities' && (
      <Footer />
      )
      }
      
    </>
  );
}

export default App;
