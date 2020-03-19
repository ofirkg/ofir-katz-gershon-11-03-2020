import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavorites } from 'views/Favorites/FavoritesSlice';
import FavoriteCard from 'components/FavoriteCard/FavoriteCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		alignContent: 'start',
		height: '100%',
	},
	title: {
		marginBottom: '50px',
	},
});

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
			<Grid container justify='center' item xs={10} spacing={3}>
				{favorites &&
					favorites.map(fav => {
						return (
							<Grid item key={fav.id}>
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
		</Grid>
	);
}
