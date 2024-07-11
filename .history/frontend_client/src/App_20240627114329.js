import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'

import Footer from './components/common/footer'
import NavbarC from './components/common/navbar'
import Home from './components/home/home'
import ContactUs from './components/contact/contactus'
import NavbarComponent from './components/common/navbar';

function App() {

  return (
    <Router>
        <NavbarComponent />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact-us' element={<ContactUs />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;