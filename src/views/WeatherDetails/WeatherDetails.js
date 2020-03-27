import React, { useState, useEffect } from 'react';
import useQuery from 'app/hooks/useQuery';
import useAxios from 'app/hooks/useAxios';
import CurrentWeatherCard from 'components/CurrentWeatherCard/CurrentWeatherCard';
import DayCard from 'components/DayCard/DayCard';
import AddToFavoritesButton from 'components/AddToFavoritesButton/AddToFavoritesButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles(theme => ({
	root: {
		alignContent: 'start',
	},
	paperWrapper: {
		padding: '20px',
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

const apikey = 'ZykvKfNQRGnZSPw9DdilEwqEzni3OBqb';

export default function WeatherDetails() {
	const query = useQuery();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTermChangeReason, setSearchTermChangeReason] = useState('');
	const [selectedOption, setSelectedOption] = useState(null);

	// autocomplete fetch
	const { results: options, loading: autocompleteLoading } = useAxios({
		url: '/locations/v1/cities/autocomplete',
		options: {
			params: {
				apikey,
				q: searchTerm,
			},
		},
		trigger: searchTerm,
		dispatchEffectCondition: () => {
			return (
				searchTerm.length !== 0 &&
				!['reset', 'clear'].includes(searchTermChangeReason)
			);
		},
	});

	// current weather fetch
	const {
		results: currentWeather = [],
		error: currentWeatherError,
		loading: currentWeatherLoading,
	} = useAxios({
		url: selectedOption
			? `/currentconditions/v1/${selectedOption.Key}`
			: '',
		options: {
			params: {
				apikey,
			},
		},
		trigger: selectedOption,
		dispatchEffectCondition: () => {
			return !!selectedOption;
		},
	});

	// forecast fetch
	const {
		results: forecast,
		error: forecastError,
		loading: forecastLoading,
	} = useAxios({
		url: selectedOption
			? `/forecasts/v1/daily/5day/${selectedOption.Key}`
			: '',
		options: {
			params: {
				apikey,
				metric: true,
			},
		},
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
		} else {
			setSelectedOption(defaultLocation);
		}
	}, []);

	const handleInputChange = (e, term, reason) => {
		setSearchTerm(term);
		setSearchTermChangeReason(reason);
	};

	const handleSelect = (e, option) => {
		if (option) {
			setSelectedOption(option);
		}
	};

	return (
		<Grid container justify='center' className={classes.root}>
			<Grid
				container
				item
				justify='center'
				xs={12}
				className={classes.autocompleteWrapper}>
				<Autocomplete
					id='asynchronous-demo'
					style={{ width: 300 }}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					onInputChange={handleInputChange}
					onChange={handleSelect}
					getOptionSelected={(option, value) =>
						option.name === value.name
					}
					getOptionLabel={option => option.LocalizedName}
					options={options || []}
					loading={autocompleteLoading}
					renderInput={params => (
						<TextField
							{...params}
							label='Search'
							variant='outlined'
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{autocompleteLoading ? (
											<CircularProgress
												color='inherit'
												size={20}
											/>
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
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
							{[...Array(5)].map((_, i) => {
								return (
									<Grid
										item
										xs={12}
										sm={6}
										md={2}
										key={`day_${i}`}>
										<DayCard
											loading={forecastLoading}
											data={forecast?.DailyForecasts[i]}
											error={forecastError}
										/>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
