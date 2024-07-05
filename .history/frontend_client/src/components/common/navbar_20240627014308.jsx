import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../assets/images/logo.webp';
import './Navbar.css';


const Navbar = () => {


  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isHamburgerMenuActive, setIsHamburgerMenuActive] = useState(false);

  function toggleHamburgerMenu() {
    setIsHamburgerMenuActive((prevState) => !prevState);
    console.log("Changed menu state")  //REMOVE
  }

  function displaySignIn(){
    return (
      <a href='/sign-in'>
          <li className='nav-bar-list-element'> Sign up / Sign in </li>
      </a>
    )
  }

  function displayProfile(){
    return (
      <a href='/profile'>
          <li className='nav-bar-list-element'> Profile </li>
      </a>
    )
  }

  const navigateToListProperty = () => {
    navigate('/list-property');
  }



  return (

  )
}

export default Navbar
