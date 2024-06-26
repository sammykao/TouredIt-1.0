import React from 'react';
import 


function App() {

  return (
    <Router>
        <AuthProvider>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignUpIn />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/list-property' element={<ListProperty />} />
            <Route path='/get-an-estimate' element={<GetAnEstimate />} />
            <Route path='/commission-and-referral-program' element={<CommisionAndReferralProgram />} />
            <Route path='/faqs' element={<FAQsPage />} />
            <Route path='/contact-us' element={<ContactUs />} />
        </Routes>
        <Footer />
        </AuthProvider>
      </Router>
  );
}

export default App;