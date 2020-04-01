import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsDark } from 'AppSlice';
import { selectFavorites } from 'views/Favorites/FavoritesSlice';
import { setTemperatureScale } from 'components/TemperatureToggle/TemperatureToggleSlice';
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import StarIcon from '@material-ui/icons/Star';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import lightBlue from '@material-ui/core/colors/lightBlue';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		marginBottom: '20px',
	},
	button: {
		marginRight: '10px',
	},
	link: {
		color: 'inherit',
		textDecoration: 'none',
		marginRight: '10px',
	},
	activeLink: {
		color: 'yellow',
	},
	switchBase: {
		color: lightBlue[300],
		'&.Mui-checked': {
			color: lightBlue[500],
		},
		'&.Mui-checked + .MuiSwitch-track': {
			backgroundColor: lightBlue[500],
		},
	},
	tempToggleLabelRoot: {
		marginLeft: '10px',
	},
}));

export default function NavBar() {
	const dispatch = useDispatch();
	const favorites = useSelector(selectFavorites);
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleThemeToggle = e => {
		dispatch(setIsDark(e.target.checked));
	};

	const handleSettingsBtnClick = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseSettingsMenu = () => {
		setAnchorEl(null);
	};

	const handleTemperatureToggle = e => {
		if (e.target.checked) dispatch(setTemperatureScale('f'));
		else dispatch(setTemperatureScale('c'));
	};

	return (
		<AppBar position='static' classes={{ root: classes.appBar }}>
			<Toolbar className={classes.toolBar}>
				<Hidden smUp>
					<NavLink
						exact
						to='/'
						className={classes.link}
						activeClassName={classes.activeLink}>
						<HomeIcon />
					</NavLink>
				</Hidden>
				<Typography variant='h6' className={classes.title}>
					Herolo Weather App
				</Typography>
				<Hidden xsDown>
					<NavLink
						exact
						to='/'
						className={classes.link}
						activeClassName={classes.activeLink}>
						<Button
							classes={{ root: classes.button }}
							color='inherit'
							variant='outlined'>
							Weather Details
						</Button>
					</NavLink>
					<NavLink
						to='/Favorites'
						className={classes.link}
						activeClassName={classes.activeLink}>
						<Button color='inherit' variant='outlined'>
							Favorites
							<Badge
								badgeContent={favorites.length}
								color='secondary'>
								<StarIcon />
							</Badge>
						</Button>
					</NavLink>
				</Hidden>
				<Hidden smUp>
					<NavLink
						to='/Favorites'
						className={classes.link}
						activeClassName={classes.activeLink}>
						<Badge
							badgeContent={favorites.length}
							color='secondary'>
							<StarIcon />
						</Badge>
					</NavLink>
				</Hidden>
				<IconButton onClick={handleSettingsBtnClick}>
					<SettingsIcon />
				</IconButton>

				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleCloseSettingsMenu}>
					<MenuItem>
						<FormControlLabel
							control={
								<Switch
									classes={{
										switchBase: classes.switchBase,
									}}
									onChange={handleThemeToggle}
									name='themeToggle'
								/>
							}
							label='Light/Dark Theme'
						/>
					</MenuItem>
					<MenuItem>
						<Grid
							component='label'
							container
							alignItems='center'
							spacing={0}>
							<Grid item>&deg;C</Grid>
							<Grid item>
								<Switch
									classes={{
										switchBase: classes.switchBase,
									}}
									onChange={handleTemperatureToggle}
									name='temperatureToggle'
								/>
							</Grid>
							<Grid item>&#8457;</Grid>
							<Grid
								item
								classes={{ root: classes.tempToggleLabelRoot }}>
								Temperature Toggle
							</Grid>
						</Grid>
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
