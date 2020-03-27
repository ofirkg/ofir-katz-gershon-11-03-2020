import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'Theme',
	initialState: {
		isDark: false,
	},
	reducers: {
		setIsDark: (state, { payload }) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.isDark = payload;
		},
	},
});

export const { setIsDark } = slice.actions;

export const selectThemeMode = state => state.theme.isDark;

export default slice.reducer;
