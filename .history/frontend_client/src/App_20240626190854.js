import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import '/App.css'

import Footer from './components/common/footer'
import Navbar from './components/common/navbar'
import Home from './components/home/home'
import ContactUs from './components/contact/contactus'

function App() {

  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/' element={<ContactUs}
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;