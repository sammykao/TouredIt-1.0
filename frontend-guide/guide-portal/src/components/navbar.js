// Filename components/NavBar.js
import "./navbar.css"
import { Link } from 'react-router-dom';
 
const Navbar = () => {
    return (
        <nav >
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/availability">Availability</Link></li>
                <li><Link to="/confirmation">Confirmation</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/stats">Stats</Link></li>
                <li><Link to="/updateAvail">Update Availability</Link></li>
                <li><Link to="/updateInfo">Update Information</Link></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;