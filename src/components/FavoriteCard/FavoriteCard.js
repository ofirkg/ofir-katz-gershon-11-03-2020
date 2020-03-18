import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import WeatherIcons from 'assets/WeatherIcons/';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		height: '100%',
	},
	content: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '20px',
	},
	contentPhrase: {
		flexGrow: '1',
	},
	degrees: {
		width: '100%',
		textAlign: 'center',
	},
});

export default function FavoriteCard({
	location,
	WeatherIcon,
	WeatherText,
	Temperature,
}) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader title={location} />
			<CardContent>
				<div className={classes.content}>
					<div>
						{WeatherIcons[WeatherIcon] ? (
							<img
								src={WeatherIcons[WeatherIcon]}
								alt={WeatherText}
							/>
						) : (
							<ImageOutlinedIcon />
						)}
					</div>
					<div className={classes.contentPhrase}>{WeatherText}</div>
				</div>

				<div className={classes.degrees}>
					{!isNaN(Temperature.Metric.Value) && (
						<Typography variant='h3' component='span'>
							{Math.round(Temperature.Metric.Value)}
							&deg;
						</Typography>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
