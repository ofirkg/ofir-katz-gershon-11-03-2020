import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://dataservice.accuweather.com';
const { CancelToken } = axios;
const apikey = 'ZykvKfNQRGnZSPw9DdilEwqEzni3OBqb';

const useAxios = ({
	url = '',
	method = 'GET',
	options = {},
	trigger,
	dispatchEffectCondition,
	customHandler,
}) => {
	const [innerTrigger, setInnerTrigger] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [results, setResults] = useState(undefined);

	let outerTrigger = trigger;
	try {
		outerTrigger = JSON.stringify(trigger);
	} catch (err) {
		//
	}

	const dispatchEffect = dispatchEffectCondition || (() => true);

	const handler = (error, response) => {
		if (customHandler) {
			customHandler(error, response);
		}
	};

	useEffect(() => {
		if (!url || !dispatchEffect()) return;
		if (typeof outerTrigger === 'undefined' && !innerTrigger) return;
		handler(null, null);
		setLoading(true);
		const source = CancelToken.source();

		(async () => {
			try {
				const result = await axios({
					url,
					method,
					cancelToken: source.token,
					...options,
					params: {
						...options.params,
						apikey,
					},
				});
				handler(null, result.data);
				setResults(result.data);
				setLoading(false);
				setError(false);
			} catch (e) {
				handler(e, null);
				if (axios.isCancel(e)) {
					console.error('fetch cancelled by user');
					setError(false);
				} else {
					console.error({ e });
					setError(true);
				}
				setLoading(false);
			}
		})();
		return () => source.cancel();
	}, [innerTrigger, outerTrigger]);

	return {
		results,
		error,
		loading,
		triggerFetch: () => setInnerTrigger(+new Date()),
	};
};

export default useAxios;
