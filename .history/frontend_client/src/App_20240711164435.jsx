import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/tools/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Footer from "@/tools/layout/footer"
import Profile from "@/pages/profile";
import { isAuthenticated } from "./tools/auth/loggedIn";


function App() {
  const { pathname } = useLocation();

  return (
    <>  
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
        <Routes>
          {routes.map(
            ({ path, element }, key) =>
              element && <Route key={key} exact path={path} element={element} />
          )}
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignIn />} />
          <Route path="/sign-up" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignUp />} />
          <Route path="/profile" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <Profile />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
