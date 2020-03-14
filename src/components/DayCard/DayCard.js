import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import WeatherIcons from 'assets/WeatherIcons/';

const useStyles = makeStyles({
	root: {
		// display: 'inline-block',
		// margin: '20px',
		// minWidth: '200px',
	},
});

export default function CurrentWeatherCard({ loading = true, data }) {
	const classes = useStyles();

	let dayName, formattedDate;

	if (!loading && data) {
		const date = new Date(data.Date);

		dayName = date.toLocaleDateString('en-us', {
			weekday: 'long',
		});

		const [month, day] = date.toLocaleDateString().split('/');
		formattedDate = `${day}/${month}`;
	}

	return (
		<Card className={classes.root}>
			<CardHeader
				title={
					loading ? (
						<Skeleton
							animation='wave'
							height={10}
							width='80%'
							style={{ marginBottom: 6 }}
						/>
					) : (
						dayName
					)
				}
				subheader={
					loading ? (
						<Skeleton animation='wave' height={10} width='40%' />
					) : (
						formattedDate
					)
				}
			/>
		</Card>
	);
}

const dataMock = {
	Date: '2020-03-14T07:00:00+02:00',
	EpochDate: 1584162000,
	Temperature: {
		Minimum: {
			Value: 14.2,
			Unit: 'C',
			UnitType: 17,
		},
		Maximum: {
			Value: 19,
			Unit: 'C',
			UnitType: 17,
		},
	},
	Day: {
		Icon: 14,
		IconPhrase: 'Partly sunny w/ showers',
		HasPrecipitation: true,
		PrecipitationType: 'Rain',
		PrecipitationIntensity: 'Light',
	},
	Night: {
		Icon: 37,
		IconPhrase: 'Hazy moonlight',
		HasPrecipitation: false,
	},
	Sources: ['AccuWeather'],
	MobileLink:
		'http://m.accuweather.com/en/il/netanya/212474/daily-weather-forecast/212474?day=1&unit=c&lang=en-us',
	Link:
		'http://www.accuweather.com/en/il/netanya/212474/daily-weather-forecast/212474?day=1&unit=c&lang=en-us',
};
