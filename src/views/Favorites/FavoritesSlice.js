import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';

export const slice = createSlice({
	name: 'favorites',
	initialState: [],
	reducers: {
		addToFavorties: (state, { payload }) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.push(payload);
		},
		removeFromFavorites: (state, { payload }) => {
			remove(state, fav => fav === payload);
		},
	},
});

export const { addToFavorties, removeFromFavorites } = slice.actions;

export const selectFavorites = state => state.favorites;

export default slice.reducer;
