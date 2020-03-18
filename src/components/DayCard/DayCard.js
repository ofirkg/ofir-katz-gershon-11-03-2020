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
	error: {
		margin: '50px 0',
		textAlign: 'center',
	},
});

const defaultData = {
	Date: Date.now(),
	Day: {
		Icon: 0,
		IconPhrase: '',
	},
	Temperature: {
		Minimum: {
			Value: 0,
		},
		Maximum: {
			Value: 0,
		},
	},
};

export default function DayCard({ loading = true, error, data = defaultData }) {
	const classes = useStyles();

	const dayIcon = data.Day.Icon;
	const IconPhrase = data.Day.IconPhrase;
	const date = new Date(data.Date);

	const dayName = date.toLocaleDateString('en-us', {
		weekday: 'long',
	});
	const [month, day] = date.toLocaleDateString().split('/');
	const formattedDate = `${day}/${month}`;

	return (
		<Card className={classes.root}>
			{error ? (
				<div className={classes.error}>Information Unavailable</div>
			) : (
				<>
					<CardHeader
						title={
							loading ? (
								<Skeleton
									animation='wave'
									height={32}
									width='80%'
									style={{ marginBottom: 6 }}
								/>
							) : (
								dayName
							)
						}
						subheader={
							loading ? (
								<Skeleton
									animation='wave'
									height={24}
									width='40%'
								/>
							) : (
								formattedDate
							)
						}
					/>
					<CardContent>
						<div className={classes.content}>
							<div>
								{loading ? (
									<Skeleton
										animation='wave'
										variant='circle'
										width={50}
										height={50}
										style={{ marginRight: '20px' }}
									/>
								) : WeatherIcons[dayIcon] ? (
									<img
										src={WeatherIcons[dayIcon]}
										alt={IconPhrase}
									/>
								) : (
									<ImageOutlinedIcon />
								)}
							</div>
							<div className={classes.contentPhrase}>
								{loading ? (
									<>
										<Skeleton
											animation='wave'
											height={16}
											width='80%'
										/>
										<Skeleton
											animation='wave'
											height={16}
											width='80%'
										/>
									</>
								) : (
									IconPhrase
								)}
							</div>
						</div>

						<div className={classes.degrees}>
							{loading ? (
								<Skeleton
									animation='wave'
									height={53}
									width='100%'
								/>
							) : (
								<>
									<Typography variant='h3' component='span'>
										{Math.round(
											data.Temperature.Maximum.Value
										)}
										&deg;
									</Typography>
									<Typography
										color='textSecondary'
										variant='h5'
										component='span'>
										/
										{Math.round(
											data.Temperature.Minimum.Value
										)}
										&deg;
									</Typography>
								</>
							)}
						</div>
					</CardContent>
				</>
			)}
		</Card>
	);
}
