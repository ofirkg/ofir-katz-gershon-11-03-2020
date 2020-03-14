import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';

import tempWeatherImage from 'assets/WeatherIcons/01-s.png';

const useStyles = makeStyles({
	root: {
		display: 'inline-block',
		margin: '20px',
		minWidth: '200px',
	},
});

export default function CurrentWeatherCard({
	loading,
	location = '',
	temperature = '',
}) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton
							animation='wave'
							variant='circle'
							width={40}
							height={40}
						/>
					) : (
						<img
							src={tempWeatherImage}
							alt='image'
							placeholder='placeholder'
						/>
					)
				}
				title={
					loading ? (
						<Skeleton
							animation='wave'
							height={10}
							width='80%'
							style={{ marginBottom: 6 }}
						/>
					) : (
						location
					)
				}
				subheader={
					loading ? (
						<Skeleton animation='wave' height={10} width='40%' />
					) : (
						temperature
					)
				}
			/>
		</Card>
	);
}
