import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import '/App.css'

import Footer from 


function App() {

  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;