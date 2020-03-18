import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from 'views/Favorites/FavoritesSlice';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import StarIcon from '@material-ui/icons/Star';

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
		backgroundColor: '#56a5e8',
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
}));

export default function NavBar() {
	const favorites = useSelector(selectFavorites);
	const classes = useStyles();
	return (
		<AppBar
			position='static'
			classes={{
				colorPrimary: classes.appBar,
			}}>
			<Toolbar className={classes.toolBar}>
				<Typography variant='h6' className={classes.title}>
					Herolo Weather App
				</Typography>
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
