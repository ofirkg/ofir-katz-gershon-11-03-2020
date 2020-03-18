import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from 'views/Favorites/FavoritesSlice';
import weatherDetailsReducer from 'views/WeatherDetails/WeatherDetailsSlice';

export default configureStore({
	reducer: {
		favorites: favoritesReducer,
		weatherDetails: weatherDetailsReducer,
	},
});
