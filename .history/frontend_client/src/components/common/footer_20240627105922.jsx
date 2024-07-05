import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About SkyfinVentures</h4>
                    <p> Making global change. </p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/commission-and-referral-program">Commision and Referal Program</a></li>
                        <li><a href="/sign-in">Sign in</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: contact@starfinventures.com </p>
                    <p>Phone: +1 (925) 381-3895</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 SKYFINVENTURES, All rights reserved.</p>
                
            </div>
        </div>
  )
}

export default Footer
