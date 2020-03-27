import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsDark } from 'AppSlice';
import { selectFavorites } from 'views/Favorites/FavoritesSlice';
import { NavLink } from 'react-router-dom';
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

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		[theme.breakpoints.down('xs')]: {
			flex: '0 0 100%',
			fontSize: '1rem',
			textAlign: 'center',
		},
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
	},
	activeLink: {
		color: 'yellow',
	},
	toolBar: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between',
			flexWrap: 'wrap',
			marginBottom: '15px',
		},
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
}));

export default function NavBar() {
	const dispatch = useDispatch();
	const favorites = useSelector(selectFavorites);
	const classes = useStyles();

	const handleThemeToggle = e => {
		dispatch(setIsDark(e.target.checked));
	};
	return (
		<AppBar position='static' classes={{ root: classes.appBar }}>
			<Toolbar className={classes.toolBar}>
				<Typography variant='h6' className={classes.title}>
					Herolo Weather App
				</Typography>
				<FormControlLabel
					control={
						<Switch
							classes={{
								switchBase: classes.switchBase,
							}}
							onChange={handleThemeToggle}
							name='checkedA'
						/>
					}
					label='Toggle Light/Dark theme'
				/>
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
			</Toolbar>
		</AppBar>
	);
}
