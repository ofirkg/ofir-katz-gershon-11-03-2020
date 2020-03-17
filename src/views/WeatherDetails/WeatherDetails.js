import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeatherCard from 'components/CurrentWeatherCard/CurrentWeatherCard';
import DayCard from 'components/DayCard/DayCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

axios.defaults.baseURL = 'http://dataservice.accuweather.com';
const { CancelToken } = axios;

const useStyles = makeStyles(theme => ({
	root: {
		alignContent: 'start',
		height: '100%',
	},
	paperWrapper: {
		padding: '20px',
		height: '100%',
		backgroundColor: '#ebebeb',
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
	favoritesButton: {
		width: '59px',
		height: '59px',
	},
}));

const defaultWeather = {
	Version: 1,
	Key: '215854',
	Type: 'City',
	Rank: 31,
	LocalizedName: 'Tel Aviv',
	Country: { ID: 'IL', LocalizedName: 'Israel' },
	AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
};

const apikey = 'ZykvKfNQRGnZSPw9DdilEwqEzni3OBqb_';

export default function WeatherDetails() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTermChangeReason, setSearchTermChangeReason] = useState('');
	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentWeatherLoading, setCurrentWeatherLoading] = useState(false);
	const [forecastLoading, setForecastLoading] = useState(false);
	const [autocompleteError, setAutocompleteError] = useState(false);
	const [currentWeatherError, setCurrentWeatherError] = useState(false);
	const [forecastError, setForecastError] = useState(false);
	const [addedToFavorites, setAddedToFavorites] = useState(false);

	// autocomplete fetch
	useEffect(() => {
		if (
			searchTerm.length === 0 ||
			['reset', 'clear'].includes(searchTermChangeReason)
		) {
			return;
		}
		setLoading(true);
		const source = CancelToken.source();
		(async () => {
			try {
				const result = await axios({
					url: '/locations/v1/cities/autocomplete',
					method: 'GET',
					cancelToken: source.token,
					params: {
						apikey,
						q: searchTerm,
					},
				});
				setOptions(result.data || []);
				setLoading(false);
				setAutocompleteError(false);
			} catch (e) {
				if (axios.isCancel(e)) {
					console.error('fetch cancelled by user');
				} else {
					console.error({ e });
					setAutocompleteError(true);
				}
				setLoading(false);
			}
		})();
		return () => source.cancel();
	}, [searchTerm, searchTermChangeReason]);

	// current weather fetch
	useEffect(() => {
		if (!selectedOption) {
			return;
		}
		setCurrentWeatherLoading(true);
		const source = CancelToken.source();
		(async () => {
			try {
				const result = await axios({
					url: `/currentconditions/v1/${selectedOption.Key}`,
					method: 'GET',
					cancelToken: source.token,
					params: {
						apikey,
					},
				});
				setCurrentWeather(result.data[0] || null);
				setCurrentWeatherLoading(false);
				setCurrentWeatherError(false);
			} catch (e) {
				if (axios.isCancel(e)) {
					console.error('fetch cancelled by user');
				} else {
					console.error({ e });
					setCurrentWeatherError(true);
				}
				setCurrentWeatherLoading(false);
			}
		})();
		return () => source.cancel();
	}, [selectedOption]);

	// forecast fetch
	useEffect(() => {
		if (!selectedOption) {
			return;
		}
		setForecastLoading(true);
		const source = CancelToken.source();
		(async () => {
			try {
				const result = await axios({
					url: `/forecasts/v1/daily/5day/${selectedOption.Key}`,
					method: 'GET',
					cancelToken: source.token,
					params: {
						apikey,
						metric: true,
					},
				});
				setForecast(result.data.DailyForecasts || null);
				setForecastLoading(false);
				setForecastError(false);
			} catch (e) {
				if (axios.isCancel(e)) {
					console.error('fetch cancelled by user');
				} else {
					console.error({ e });
					setForecastError(true);
				}
				setForecastLoading(false);
			}
		})();
		return () => source.cancel();
	}, [selectedOption]);

	// default weather fetch
	useEffect(() => {
		setSelectedOption(defaultWeather);
	}, []);

	const handleInputChange = (e, term, reason) => {
		setSearchTerm(term);
		setSearchTermChangeReason(reason);
	};

	const handleSelect = (e, option) => {
		option && setSelectedOption(option);
	};

	const toggleFavorite = () => {
		setAddedToFavorites(prev => !prev);
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
					options={options}
					loading={loading}
					renderInput={params => (
						<TextField
							{...params}
							label='Asynchronous'
							variant='outlined'
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? (
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
									location={
										selectedOption &&
										selectedOption.LocalizedName
									}
									temperature={
										currentWeather &&
										currentWeather.Temperature.Metric.Value
									}
									icon={
										currentWeather &&
										currentWeather.WeatherIcon
									}
								/>
							</Grid>
							<Grid
								container
								item
								xs={12}
								sm={6}
								justify='flex-end'
								alignItems='center'>
								{addedToFavorites ? (
									<IconButton
										onClick={toggleFavorite}
										className={classes.favoritesButton}>
										<Tooltip
											title='Remove from favorties'
											aria-label='Remove from favorties'>
											<StarRoundedIcon
												fontSize='large'
												style={{ color: '#F5CC27' }}
											/>
										</Tooltip>
									</IconButton>
								) : (
									<IconButton
										onClick={toggleFavorite}
										className={classes.favoritesButton}>
										<Tooltip
											title='Add to favorties'
											aria-label='Add to favorties'>
											<StarBorderRoundedIcon fontSize='large' />
										</Tooltip>
									</IconButton>
								)}
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
									{currentWeather &&
										currentWeather.WeatherText}
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
											data={forecast && forecast[i]}
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
