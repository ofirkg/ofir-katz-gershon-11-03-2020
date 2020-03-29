import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'temperatureScale',
	initialState: { scale: 'c' },
	reducers: {
		setTemperatureScale: (state, { payload }) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.scale = payload;
		},
	},
});

export const { setTemperatureScale } = slice.actions;

export const selectScale = state => state.temperatureScale.scale;

export default slice.reducer;
