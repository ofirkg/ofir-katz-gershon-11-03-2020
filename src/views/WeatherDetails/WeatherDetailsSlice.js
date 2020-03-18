import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'WeatherDetails',
	initialState: {
		currentWeather: null,
	},
	reducers: {
		setCurrentWeather: (state, { payload }) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.currentWeather = payload;
		},
	},
});

export const { setCurrentWeather } = slice.actions;

export const selectCurrentWeather = state => state.currentWeather;

export default slice.reducer;
