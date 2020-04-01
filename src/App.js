import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'AppSlice';
import NavBar from 'components/Navbar/Navbar';
import WeatherDetails from 'views/WeatherDetails/WeatherDetails';
import Favorites from 'views/Favorites/Favorites';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import lightBlue from '@material-ui/core/colors/lightBlue';

const useStyles = makeStyles(theme => {
	return {
		root: {
			backgroundColor: theme.palette.background.paper,
			height: '100%',
			overflow: 'auto',
		},
	};
});

const MUIContainer = ({ children }) => {
	const classes = useStyles();
	return (
		<Container
			disableGutters
			maxWidth={false}
			classes={{
				root: classes.root,
			}}>
			{children}
		</Container>
	);
};

function App() {
	const isDarkTheme = useSelector(selectThemeMode);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const isDark = prefersDarkMode || isDarkTheme;
	const myTheme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: isDark ? 'dark' : 'light',
					background: {
						paperWrapper: isDark ? '#303030' : '#ebebeb',
					},
					primary: {
						main: isDark ? lightBlue[900] : lightBlue[500],
					},
				},
				overrides: {
					MuiAppBar: {
						colorPrimary: {
							color: '#fff',
						},
					},
				},
			}),
		[isDark]
	);

	return (
		<ThemeProvider theme={myTheme}>
			<CssBaseline />
			<Router>
				<MUIContainer>
					<NavBar />
					<Switch>
						<Route exact path='/' component={WeatherDetails} />
						<Route path='/Favorites' component={Favorites} />
					</Switch>
				</MUIContainer>
			</Router>
		</ThemeProvider>
	);
}

export default App;
