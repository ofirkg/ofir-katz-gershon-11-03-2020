import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from 'components/Navbar/Navbar';
import WeatherDetails from 'views/WeatherDetails/WeatherDetails';
import Favorites from 'views/Favorites/Favorites';

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path='/' component={WeatherDetails} />
				<Route path='/Favorites' component={Favorites} />
			</Switch>
		</Router>
	);
}

export default App;
