import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const { CancelToken } = axios;

export default function WeatherDetails() {
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchTerm.length === 0) {
			return;
		}
		setLoading(true);
		const source = CancelToken.source();
		(async () => {
			try {
				const result = await axios({
					url:
						'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
					method: 'GET',
					cancelToken: source.token,
					params: {
						apikey: 'ZykvKfNQRGnZSPw9DdilEwqEzni3OBqb',
						q: searchTerm,
					},
				});
				setOptions(result.data || []);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				console.error(e);
			}
		})();
		return () => source.cancel();
	}, [searchTerm]);

	const handleInputChange = (e, term, reason) => {
		setSearchTerm(term);
	};

	return (
		<Grid container justify='center'>
			<Grid container item justify='center' xs={12}>
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
				<Paper>
					<Grid container>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12} sm={6}>
									current weather
								</Grid>
								<Grid
									container
									item
									xs={12}
									sm={6}
									justify='flex-end'>
									favorites
								</Grid>
							</Grid>
						</Grid>
						<Grid container item justify='center' xs={12}>
							<p>current weather description</p>
						</Grid>
						<Grid container item justify='center' xs={12}>
							<Grid item xs={12} sm={6} md={2}>
								<Card>1</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={2}>
								<Card>2</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={2}>
								<Card>3</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={2}>
								<Card>4</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={2}>
								<Card>5</Card>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

const autoCompleteMock = [
	{
		Version: 1,
		Key: '182536',
		Type: 'City',
		Rank: 10,
		LocalizedName: 'Athens',
		Country: { ID: 'GR', LocalizedName: 'Greece' },
		AdministrativeArea: { ID: 'I', LocalizedName: 'Attica' },
	},
	{
		Version: 1,
		Key: '316938',
		Type: 'City',
		Rank: 10,
		LocalizedName: 'Ankara',
		Country: { ID: 'TR', LocalizedName: 'Turkey' },
		AdministrativeArea: { ID: '06', LocalizedName: 'Ankara' },
	},
	{
		Version: 1,
		Key: '126995',
		Type: 'City',
		Rank: 11,
		LocalizedName: 'Alexandria',
		Country: { ID: 'EG', LocalizedName: 'Egypt' },
		AdministrativeArea: { ID: 'ALX', LocalizedName: 'Alexandria' },
	},
	{
		Version: 1,
		Key: '56912',
		Type: 'City',
		Rank: 13,
		LocalizedName: 'Anqing',
		Country: { ID: 'CN', LocalizedName: 'China' },
		AdministrativeArea: { ID: 'AH', LocalizedName: 'Anhui' },
	},
	{
		Version: 1,
		Key: '59083',
		Type: 'City',
		Rank: 15,
		LocalizedName: 'Anyang',
		Country: { ID: 'CN', LocalizedName: 'China' },
		AdministrativeArea: { ID: 'HA', LocalizedName: 'Henan' },
	},
	{
		Version: 1,
		Key: '102138',
		Type: 'City',
		Rank: 15,
		LocalizedName: 'Anshan',
		Country: { ID: 'CN', LocalizedName: 'China' },
		AdministrativeArea: { ID: 'LN', LocalizedName: 'Liaoning' },
	},
	{
		Version: 1,
		Key: '202438',
		Type: 'City',
		Rank: 15,
		LocalizedName: 'Ahmedabad',
		Country: { ID: 'IN', LocalizedName: 'India' },
		AdministrativeArea: { ID: 'GJ', LocalizedName: 'Gujarat' },
	},
	{
		Version: 1,
		Key: '2093',
		Type: 'City',
		Rank: 20,
		LocalizedName: 'Algiers',
		Country: { ID: 'DZ', LocalizedName: 'Algeria' },
		AdministrativeArea: { ID: '16', LocalizedName: 'Alger' },
	},
	{
		Version: 1,
		Key: '126831',
		Type: 'City',
		Rank: 20,
		LocalizedName: 'Addis Ababa',
		Country: { ID: 'ET', LocalizedName: 'Ethiopia' },
		AdministrativeArea: { ID: 'AA', LocalizedName: 'Addis Ababa' },
	},
	{
		Version: 1,
		Key: '178551',
		Type: 'City',
		Rank: 20,
		LocalizedName: 'Accra',
		Country: { ID: 'GH', LocalizedName: 'Ghana' },
		AdministrativeArea: { ID: 'AA', LocalizedName: 'Greater Accra' },
	},
];
