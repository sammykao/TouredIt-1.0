import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../assets/images/logo.webp';
import './Navbar.css';

import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

import { createTheme, Menu, ThemeProvider} from '@mui/material';
import { AuthContext } from '../../../firebase/AuthContext';


const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#B2C3FD'
    }
  }
})

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
    <div className='nav-bar-container'>

      <div className='nav-bar-left-side'> 

          <a href='/'>
            <img className='nav-bar-logo' src={Logo} />
          </a>

          <ul className={`nav-bar-list ${isHamburgerMenuActive ? 'hamburger-menu active' : ''}`}>


            <div className='nav-bar-close-icon'>
              <ClearIcon sx={{fontSize: '40px'}} onClick={toggleHamburgerMenu} />
            </div>

            <a href='/'>
              <li className='nav-bar-list-element'> Home </li>
            </a>

            <a href='/get-an-estimate'>
              <li className='nav-bar-list-element'> Get An Estimate </li>
            </a>

            <a href='/commission-and-referral-program'>
              <li className='nav-bar-list-element'> Commission and Referral Program  </li>
            </a>

            <a href='/case-studies'>
              <li className='nav-bar-list-element'> Case Studies </li>
            </a>

            <a href='/blog'>
              <li className='nav-bar-list-element'> Blog </li>
            </a>

            <a href='/faqs'>
              <li className='nav-bar-list-element'> FAQs </li>
            </a>

            <a href='/contact-us'>
              <li className='nav-bar-list-element'> Contact Us </li>
            </a>

            <div>
              {currentUser && displayProfile()}
              {!currentUser && displaySignIn()}
            </div>

        </ul>

        <div className='nav-bar-menu-icon'>
          <MenuIcon sx={{fontSize: '33px'}} onClick={toggleHamburgerMenu}/>
        </div>

      </div>

      <div className='nav-bar-right-side'>
        <ThemeProvider theme={buttonTheme}>
          <Button onClick={navigateToListProperty} sx={{fontFamily: "'Poppins', sans-serif"}} className='nav-bar-right-side-button' variant='contained' color='primary'> List Property </Button>
          <Button sx={{fontFamily: "'Poppins', sans-serif", marginLeft: "15px"}} className='nav-bar-right-side-button' variant='contained' color='primary'> View Properties </Button>
        </ThemeProvider>
      </div>

    </div>
  )
}

export default Navbar
