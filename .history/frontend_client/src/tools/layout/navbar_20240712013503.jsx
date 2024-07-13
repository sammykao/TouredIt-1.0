import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { isAuthenticated } from "../auth/loggedIn";

export function Navbar({ routes }) {
  const [openNav, setOpenNav] = React.useState(false);

  const action = (
    <Link to="sign-up">
      <Button variant="gradient" size="sm" fullWidth>
        Sign Up
      </Button>
    </Link>
  );
  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-2 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );



  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };


  return (
    <MTNavbar color="transparent" className="p-1/2">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <img
            src="./../public/img/touredit-logo.png"
            alt="Logo"
            className="cursor-pointer w-48 lg:w-60"
            style={{ padding: 0 }}
          />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 ml-20 p-4 lg:flex">
          {isAuthenticated() ? (
            <>
              <Link to="/profile">
                <Button color="light-gray" size="sm" fullWidth>
                  Profile
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="text" size="sm" color="white" fullWidth>
                  Sign In
                </Button>
              </Link>
              {React.cloneElement(action, {
                className: "hidden lg:inline-block",
              })}
            </>
          )}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {isAuthenticated() ? (
            <>
              <Link to="/profile">
                <Button color="light-gray" size="sm" fullWidth>
                  Profile
                </Button>
              </Link>
              <Link to="profile">
                <Button variant="text" size="sm" fullWidth>
                  Sign In
                </Button>
              </Link>
              {React.cloneElement(action, {
                className: "w-full block",
              })}
            </>
          ) : (
            <>
              <Link to="sign-in">
                <Button variant="text" size="sm" fullWidth>
                  Sign In
                </Button>
              </Link>
              {React.cloneElement(action, {
                className: "w-full block",
              })}
            </>
          )}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
