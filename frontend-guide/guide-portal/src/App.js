// // Filename - App.js

import React from "react";
import Navbar from "./components/navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/home";
import Availability from "./pages/availability";
import Confirmation from "./pages/confirmation";
import Signup from "./pages/signup";
import Stats from "./pages/stats";
import UpdateAvailability from "./pages/updateAvail";
import UpdateInfo from "./pages/updateInfo";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/availability" element={<Availability />} />
				<Route path="/confirmation" element={<Confirmation />}/>
				<Route path="/signup" element={<Signup />} />
				<Route path="/stats" element={<Stats />}/>
        <Route path="/updateAvail" element={<UpdateAvailability />} />
        <Route path="/updateInfo" element={<UpdateInfo />} />
			</Routes>
		</Router>
	);
}

export default App;
