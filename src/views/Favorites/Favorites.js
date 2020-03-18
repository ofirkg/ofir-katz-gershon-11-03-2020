import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		alignContent: 'start',
		height: '100%',
	},
});

export default function Favorites() {
	const classes = useStyles();
	return (
		<Grid container justify='center' className={classes.root}>
			<Typography variant='h2'>Favorites</Typography>
		</Grid>
	);
}
