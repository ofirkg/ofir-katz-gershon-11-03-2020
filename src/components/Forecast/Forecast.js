import React from 'react';
import useAxios from 'app/hooks/useAxios';
import DayCard from 'components/DayCard/DayCard';

import Grid from '@material-ui/core/Grid';

export default function Forecast({ selectedOption }) {
	// forecast fetch
	const {
		results: forecast,
		error: forecastError,
		loading: forecastLoading,
	} = useAxios({
		url: `/forecasts/v1/daily/5day/${selectedOption?.Key}`,
		options: {
			params: {
				metric: true,
			},
		},
		trigger: selectedOption,
		dispatchEffectCondition: () => {
			return !!selectedOption;
		},
	});
	return (
		<>
			{[...Array(5)].map((_, i) => {
				return (
					<Grid item xs={12} sm={6} md={2} key={`day_${i}`}>
						<DayCard
							loading={forecastLoading}
							data={forecast?.DailyForecasts[i]}
							error={forecastError}
						/>
					</Grid>
				);
			})}
		</>
	);
}
