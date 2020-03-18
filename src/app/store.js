import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from 'views/Favorites/FavoritesSlice';

export default configureStore({
	reducer: {
		favorites: favoritesReducer,
	},
});
