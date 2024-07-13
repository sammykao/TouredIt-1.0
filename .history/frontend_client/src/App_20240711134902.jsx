import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Home from "@/pages/home"
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Footer from "@/widgets/layout/footer"
import Profile from "@/pages/profile";



function App() {
  const { pathname } = useLocation();
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  return (
    <>
        {!(pathname == '/sign-in' || pathname == '/sign-up') && (
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
          element={isAuthenticated() ? <HomePage /> : <Navigate replace to="/login" />} 
          <Route path="/sign-in" element={isAuthenticated() ? <SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
