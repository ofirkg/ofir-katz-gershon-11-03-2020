import { useState, useEffect } from 'react';

export default function useGeolocation() {
	const [position, setPosition] = useState({});
	const [error, setError] = useState(null);

	const success = ({ coords }) => {
		setPosition({
			latitude: coords.latitude,
			longitude: coords.longitude,
		});
	};

	const onError = error => {
		setError(error.message);
	};

	useEffect(() => {
		const geo = navigator.geolocation;
		if (!geo) {
			setError('Geolocation is not supported');
			return;
		}
		geo.getCurrentPosition(success, onError);
	}, []);

	return { ...position, error };
}
