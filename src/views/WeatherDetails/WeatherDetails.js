import React, { useState, useEffect } from 'react';
import useQuery from 'app/hooks/useQuery';
import useAxios from 'app/hooks/useAxios';
import useGeolocation from 'app/hooks/useGeolocation';
import CurrentWeatherCard from 'components/CurrentWeatherCard/CurrentWeatherCard';
import AddToFavoritesButton from 'components/AddToFavoritesButton/AddToFavoritesButton';
import LocationsAutocomplete from 'components/Autocomplete/LocationsAutocomplete';
import Forecast from 'components/Forecast/Forecast';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles(theme => ({
	root: {
		alignContent: 'start',
	},
	paperWrapper: {
		padding: '20px',
		marginBottom: '50px',
		height: '100%',
		backgroundColor: theme.palette.background.paperWrapper,
	},
	autocompleteWrapper: {
		marginBottom: '50px',
	},
	currentWeatherTop: {
		flexWrap: 'nowrap',
		marginBottom: '20px',
	},
	currentWeatherPhrase: {
		margin: '50px 0',
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.75rem',
		},
	},
	currentWeatherErrorWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	currentWeatherError: {
		margin: '20px 0 50px',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.75rem',
		},
	},
	currentWeatherErrorIcon: {
		fontSize: '40px',
	},
}));

const defaultLocation = {
	Version: 1,
	Key: '215854',
	Type: 'City',
	Rank: 31,
	LocalizedName: 'Tel Aviv',
	Country: { ID: 'IL', LocalizedName: 'Israel' },
	AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
};

export default function WeatherDetails() {
	const query = useQuery();
	const classes = useStyles();
	const [selectedOption, setSelectedOption] = useState(null);
	const { latitude, longitude, error: geolocationError } = useGeolocation();

	const defaultWeatherResultHandler = (error, response) => {
		if (response) {
			const { Key, LocalizedName } = response;
			setSelectedOption({ Key, LocalizedName });
		} else {
			setSelectedOption(defaultLocation);
		}
	};

	// default weather location fetch
	const {
		results: defaultWeatherLocation,
		loading: defaultWeatherLocationLoading,
		triggerFetch: fetchDefaultWeatherLocation,
	} = useAxios({
		// url: '/locations/v1/cities/geoposition/search',
		url: '/geoposition',
		options: {
			params: {
				q: `${latitude},${longitude}`,
			},
		},
		customHandler: defaultWeatherResultHandler,
		trigger: latitude || longitude,
		dispatchEffectCondition: () => !query.get('id'),
	});

	// current weather fetch
	const {
		results: currentWeather = [],
		error: currentWeatherError,
		loading: currentWeatherLoading,
	} = useAxios({
		// url: `/currentconditions/v1/${selectedOption?.Key}`,
		url: `/currentWeather`,
		trigger: selectedOption,
		dispatchEffectCondition: () => {
			return !!selectedOption;
		},
	});

	// default weather fetch
	useEffect(() => {
		const idQueryParam = query.get('id');
		const locationQueryParam = query.get('location');
		if (idQueryParam) {
			setSelectedOption({
				Key: idQueryParam,
				LocalizedName: locationQueryParam,
			});
			return;
		}

		if (latitude || longitude) {
			fetchDefaultWeatherLocation();
			return;
		}

		setSelectedOption(defaultLocation);
	}, []);

	const handleSelectLocation = (e, option) =>
		option && setSelectedOption(option);

	return (
		<Grid container justify='center' className={classes.root}>
			<Grid
				container
				item
				justify='center'
				xs={12}
				className={classes.autocompleteWrapper}>
				<LocationsAutocomplete handleSelect={handleSelectLocation} />
			</Grid>
			<Grid item xs={10}>
				<Paper className={classes.paperWrapper}>
					<Grid container>
						<Grid
							container
							item
							className={classes.currentWeatherTop}
							xs={12}>
							<Grid item xs={12} sm={6}>
								<CurrentWeatherCard
									loading={currentWeatherLoading}
									error={currentWeatherError}
									location={selectedOption?.LocalizedName}
									temperature={
										currentWeather[0]?.Temperature.Metric
											?.Value
									}
									icon={currentWeather[0]?.WeatherIcon}
								/>
							</Grid>
							<Grid
								container
								item
								xs={12}
								sm={6}
								justify='flex-end'
								alignItems='center'>
								<AddToFavoritesButton
									locationId={selectedOption?.Key}
									locationName={selectedOption?.LocalizedName}
									weatherData={
										currentWeather && currentWeather[0]
									}
								/>
							</Grid>
						</Grid>
						<Grid container item justify='center' xs={12}>
							{currentWeatherLoading ? (
								<Skeleton
									animation='wave'
									height={72}
									width='40%'
									style={{ margin: '50px 0' }}
								/>
							) : currentWeatherError ? (
								<div
									className={
										classes.currentWeatherErrorWrapper
									}>
									<SentimentVeryDissatisfiedIcon
										className={
											classes.currentWeatherErrorIcon
										}
									/>
									<Typography
										variant='h2'
										className={classes.currentWeatherError}>
										Information Unavailable
									</Typography>
								</div>
							) : (
								<Typography
									variant='h2'
									className={classes.currentWeatherPhrase}>
									{currentWeather[0]?.WeatherText}
								</Typography>
							)}
						</Grid>
						<Grid
							container
							item
							justify='center'
							xs={12}
							spacing={2}>
							<Forecast selectedOption={selectedOption} />
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
