import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/tools/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import Profile from "@/pages/profile";
import Tours from "@/pages/tours";
import Calls from "@/pages/calls"
import UpdateHobbies from "@/pages/update-hobbies";
import UpdateActivities from "@/pages/update-activities";
import UpdateWorkExperience from "@/pages/update-work-experience";
import Footer from "@/tools/layout/footer";
import GuideSignUp from "@/pages/guide_signup";
import { isAuthenticated } from "./tools/auth/loggedIn";
import TermsAndConditions from "./tools/layout/terms";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!( pathname == '/update-hobbies' || pathname == '/tours'|| pathname == '/update-activities' 
      || pathname == '/profile' || pathname == '/update-work-experience') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<GuideSignUp />} />
        <Route path="/sign-in" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignIn />} />
        <Route path="/profile" element={isAuthenticated() ?  <Profile /> : <Navigate replace to="/home" />} />
        <Route path="/tours" element={isAuthenticated() ?  <Tours /> : <Navigate replace to="/home" />} />
        <Route path="/update-hobbies" element={isAuthenticated() ?  <UpdateHobbies /> : <Navigate replace to="/home" />} />
        <Route path="/update-work-experience" element={isAuthenticated() ?  <UpdateWorkExperience /> : <Navigate replace to="/home" />} />
        <Route path="/update-activities" element={isAuthenticated() ?  <UpdateActivities /> : <Navigate replace to="/home" />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
