import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from 'views/Favorites/FavoritesSlice';
import weatherDetailsReducer from 'views/WeatherDetails/WeatherDetailsSlice';
import themeReducer from 'AppSlice';

export default configureStore({
	reducer: {
		favorites: favoritesReducer,
		weatherDetails: weatherDetailsReducer,
		theme: themeReducer,
	},
});
