import React from 'react';
import { useSelector } from 'react-redux';
import { selectScale } from 'components/TemperatureToggle/TemperatureToggleSlice';

export default function TemperatureToggle({ metricValue }) {
	const scale = useSelector(selectScale);

	const cValue = Math.round(metricValue);
	const fValue = Math.round((metricValue * 9) / 5 + 32);

	const renderScale = () => {
		switch (scale) {
			case 'c':
				return <span>{`${cValue}`}&deg;c</span>;
			case 'f':
				return <span>{`${fValue}`}&#8457;</span>;
		}
	};

	return <>{!isNaN(cValue) && !isNaN(fValue) ? renderScale() : ''}</>;
}
