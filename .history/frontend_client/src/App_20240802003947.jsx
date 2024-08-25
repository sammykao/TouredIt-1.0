import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/tools/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Footer from "@/tools/layout/footer"
import Profile from "@/pages/profile";
import FindGuide from "@/pages/find-guide";
import BookGuide from "@/pages/book-guide";
import ThankYou from "@/tools/layout/post-booking";
import { isAuthenticated } from "./tools/auth/loggedIn";
import TermsAndConditions from "./tools/layout/terms";


function App() {
  const { pathname } = useLocation();

  return (
    <>  
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
        <Helmet>
          <title>TouredIt</title>
          <meta name="description" content="Default description for the website." />
        </Helmet>
        <Routes>
          {routes.map(
            ({ path, element }, key) =>
              element && <Route key={key} exact path={path} element={element} />
          )}
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignIn />} />
          <Route path="/sign-up" element={isAuthenticated() ?  <Navigate replace to="/home" /> : <SignUp />} />
          <Route path="/profile" element={isAuthenticated() ?  <Profile /> : <Navigate replace to="/home" />} />
          <Route path="/find-guide" element={<FindGuide />} />
          <Route path="/book-guide" element={isAuthenticated() ?  <BookGuide /> : <Navigate replace to="/sign-in" />} />
          <Route path="/thanks" element={isAuthenticated() ?  <ThankYou /> : <Navigate replace to="/home" />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
