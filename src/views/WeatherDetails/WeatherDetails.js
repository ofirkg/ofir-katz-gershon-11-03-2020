import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

export default function WeatherDetails() {
	return (
		<Grid container justify='center'>
			<Grid item xs={12}>
				<Grid container justify='center'>
					search bar
				</Grid>
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
