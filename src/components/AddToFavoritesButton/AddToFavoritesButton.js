import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToFavorties,
	removeFromFavorites,
	selectFavorites,
} from 'views/Favorites/FavoritesSlice';

import { makeStyles } from '@material-ui/core/styles';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
	buttonRoot: {
		width: '59px',
		height: '59px',
	},
});

export default function AddToFavoritesButton({
	locationId,
	locationName,
	weatherData,
}) {
	const favorites = useSelector(selectFavorites);
	const dispatch = useDispatch();
	const classes = useStyles();
	const isInFavorites = favorites.some(fav => fav.id === locationId);

	const toggleFavorite = () => {
		if (isInFavorites) {
			dispatch(removeFromFavorites(locationId));
		} else {
			dispatch(
				addToFavorties({
					id: locationId,
					location: locationName,
					data: weatherData,
				})
			);
		}
	};

	return (
		<>
			<IconButton
				disabled={!locationId}
				onClick={toggleFavorite}
				className={classes.buttonRoot}>
				{isInFavorites ? (
					<Tooltip
						title='Remove from favorties'
						aria-label='Remove from favorties'>
						<StarRoundedIcon
							fontSize='large'
							style={{ color: '#F5CC27' }}
						/>
					</Tooltip>
				) : (
					<Tooltip
						title='Add to favorties'
						aria-label='Add to favorties'>
						<StarBorderRoundedIcon fontSize='large' />
					</Tooltip>
				)}
			</IconButton>
		</>
	);
}
