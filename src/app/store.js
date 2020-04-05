import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import favoritesReducer from 'views/Favorites/FavoritesSlice';
import weatherDetailsReducer from 'views/WeatherDetails/WeatherDetailsSlice';
import themeReducer from 'AppSlice';
import temperatureToggleReducer from 'components/TemperatureToggle/TemperatureToggleSlice';

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
	favorites: favoritesReducer,
	weatherDetails: weatherDetailsReducer,
	theme: themeReducer,
	temperatureScale: temperatureToggleReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: pReducer,
});

export const persistor = persistStore(store);

export default store;
