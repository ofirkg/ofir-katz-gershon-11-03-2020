import React from 'react';
import NavBar from 'components/Navbar/Navbar';
import WeatherDetails from 'views/WeatherDetails/WeatherDetails';
import Favorites from 'views/Favorites/Favorites';

function App() {
	return (
		<div>
			<NavBar />
			<WeatherDetails />
			<Favorites />
		</div>
	);
}

export default App;
