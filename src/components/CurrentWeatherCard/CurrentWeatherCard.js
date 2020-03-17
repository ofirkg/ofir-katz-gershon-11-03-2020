import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import WeatherIcons from 'assets/WeatherIcons/';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		display: 'inline-block',
		minWidth: '200px',
	},
	error: {
		textAlign: 'center',
		margin: '20px',
	},
});

export default function CurrentWeatherCard({
	loading,
	error,
	location = '',
	temperature = '',
	icon = 0,
}) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			{error ? (
				<div className={classes.error}>Information Unavailable</div>
			) : (
				<CardHeader
					avatar={
						loading ? (
							<Skeleton
								animation='wave'
								variant='circle'
								width={50}
								height={50}
							/>
						) : WeatherIcons[icon] ? (
							<img src={WeatherIcons[icon]} alt='weatherIcon' />
						) : (
							<ImageOutlinedIcon />
						)
					}
					title={
						loading ? (
							<Skeleton
								animation='wave'
								height={16}
								width='80%'
								style={{ marginBottom: 6 }}
							/>
						) : (
							<Typography variant='subtitle1'>
								{location}
							</Typography>
						)
					}
					subheader={
						loading ? (
							<Skeleton
								animation='wave'
								height={14}
								width='40%'
							/>
						) : (
							<Typography variant='subtitle2'>
								{Math.round(temperature)}&deg;
							</Typography>
						)
					}
				/>
			)}
		</Card>
	);
}
