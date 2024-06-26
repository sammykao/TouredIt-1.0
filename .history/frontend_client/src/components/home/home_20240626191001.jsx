import React from 'react';
import './Home.css';

import FirstSection from './FirstSection';
import HowItWorks from './HowItWorks';
import Steps from './Steps';
import WhatWedo from './WhatWedo';
import HowYouBenefit from './HowYouBenefit';
import CheckOutPrograms from './CheckOutPrograms';

const Home = () => {
  return (
    <div className='home-container'>
      <FirstSection />
      <HowItWorks />
      <Steps />
      <WhatWedo />
      <HowYouBenefit />
      <CheckOutPrograms />
    </div>
  )
}

export default Home