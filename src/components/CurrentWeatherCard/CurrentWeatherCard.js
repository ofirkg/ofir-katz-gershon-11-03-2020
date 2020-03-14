import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
	root: {
		display: 'inline-block',
		margin: '20px',
	},
});

export default function CurrentWeatherCard({ loading, location, temperature }) {
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<img
						src={tempWeatherImage}
						alt='image'
						placeholder='placeholder'
					/>
				}
				title={location}
				subheader={temperature}
			/>
		</Card>
	);
}
