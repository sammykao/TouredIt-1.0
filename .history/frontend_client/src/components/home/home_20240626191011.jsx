import React from 'react';
import './Home.css';


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