import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavorites } from 'views/Favorites/FavoritesSlice';
import FavoriteCard from 'components/FavoriteCard/FavoriteCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		alignContent: 'start',
	},
	title: {
		marginBottom: '50px',
	},
	paperWrapper: {
		padding: '20px',
		height: '100%',
		backgroundColor: theme.palette.background.paperWrapper,
	},
}));

export default function Favorites() {
	const classes = useStyles();
	const favorites = useSelector(selectFavorites);
	return (
		<Grid container justify='center' className={classes.root}>
			<Grid
				container
				item
				justify='center'
				xs={12}
				className={classes.title}>
				<Typography variant='h2'>Favorites</Typography>
			</Grid>
			<Grid item xs={10}>
				<Paper className={classes.paperWrapper}>
					<Grid container spacing={3}>
						{favorites &&
							favorites.map(fav => {
								return (
									<Grid
										item
										xs={12}
										sm={6}
										md={2}
										key={fav.id}>
										<Link
											to={`/?id=${fav.id}&location=${fav.location}`}
											style={{ textDecoration: 'none' }}>
											<FavoriteCard
												location={fav.location}
												{...fav.data}
											/>
										</Link>
									</Grid>
								);
							})}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
