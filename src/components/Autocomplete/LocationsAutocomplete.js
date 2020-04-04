import React, { useState } from 'react';
import useAxios from 'app/hooks/useAxios';

import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Autocomplete({ handleSelect }) {
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTermChangeReason, setSearchTermChangeReason] = useState('');

	// autocomplete fetch
	const { results: options, loading } = useAxios({
		url: '/locations/v1/cities/autocomplete',
		options: {
			params: {
				q: searchTerm,
			},
		},
		trigger: searchTerm,
		dispatchEffectCondition: () => {
			return (
				searchTerm.length !== 0 &&
				!['reset', 'clear'].includes(searchTermChangeReason)
			);
		},
	});

	const handleInputChange = (e, term, reason) => {
		setSearchTerm(term);
		setSearchTermChangeReason(reason);
	};

	return (
		<MUIAutocomplete
			id='asynchronous-demo'
			style={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onInputChange={handleInputChange}
			onChange={handleSelect}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={option => option.LocalizedName}
			options={options || []}
			loading={loading}
			renderInput={params => (
				<TextField
					{...params}
					label='Search'
					variant='outlined'
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress
										color='inherit'
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
}
