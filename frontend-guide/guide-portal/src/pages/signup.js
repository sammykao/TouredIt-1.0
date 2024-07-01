// Filename - pages/signup.js
import './signup.css';
import React from "react";
 
const Signup = () => {
    return (

            <div class="formCont">
      <h1>We want you to become a guide!</h1>
      <p>Join us today to become apart of our amazing team of guides</p>
    <form action="/adduser.js" method="post">
      <label> Name<br/>
        <input type="text"  placeholder="Name"/>
      </label> <br/><br/>
      <label>Email<br/>
        <input type="text" placeholder="Email"/>
      </label><br/><br/>
      <label>Hometown<br/>
        <input type="text" placeholder="Hometown"/>
      </label><br/><br/>
      <label>Phone<br/>
        <input type="text"placeholder="Your number"/>
      </label><br/><br/>
      <label>A brief about you<br/>
        <input type="text" placeholder="Bio"/>
      </label><br/><br/>
      <label>Major<br/>
        <input type="text" placeholder="Major"/>
      </label><br/><br/>
      <label>Secondary Major (optional)<br/>
        <input type="text" placeholder="Secondary major"/>
      </label><br/><br/>
      <label>Minor (optional)<br/>
        <input type="text" placeholder="Minor"/>
      </label><br/><br/>
      <label>Secondary Minor (optional)<br/>
        <input type="text" placeholder="Secondary Minor"/>
      </label><br/><br/>
      <label>Profile Image<br/>
        <input type="file" />
      </label><br/><br/>
      <label>Instagram Username<br/>
        <input type="text" placeholder="Username"/>
      </label><br/><br/>
      <label>LinkedIn Username<br/>
        <input type="text" placeholder="Username"/>
      </label><br/><br/>
      <input type="submit" value="Join Us!"></input>

    </form>
    
    </div>
        
    );
};
 
export default Signup;