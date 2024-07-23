import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/tools/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import Profile from "@/pages/profile";
import Account from "@/pages/account";
import Tours from "@/pages/tours";
import UpdateHobbies from "@/pages/update-hobbies";
import UpdateActivities from "@/pages/update-activities";
import GuideSignUp from "@/pages/guide_signup";
import Footer from "@/tools/layout/footer";
import { isAuthenticated } from "./tools/auth/loggedIn";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!( pathname == '/update-hobbies' || pathname == '/tours'|| pathname == '/update-activities' || pathname == '/profile' || pathname == '/why-touredit') && (
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
        <Route path="/account" element={isAuthenticated() ?  <Account /> : <Navigate replace to="/home" />} />
        <Route path="/profile" element={isAuthenticated() ?  <Profile /> : <Navigate replace to="/home" />} />
        <Route path="/tours" element={isAuthenticated() ?  <Tours /> : <Navigate replace to="/home" />} />
        <Route path="/update-hobbies" element={isAuthenticated() ?  <UpdateHobbies /> : <Navigate replace to="/home" />} />
        <Route path="/update-activities" element={isAuthenticated() ?  <UpdateActivities /> : <Navigate replace to="/home" />} />
      </Routes>
      {!(pathname == '/why-touredit') && (
      <Footer />
      )
      }
      
    </>
  );
}

export default App;
