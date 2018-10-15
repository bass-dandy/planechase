import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';

export default function Sort(props) {
	return (
		<FormControl>
			<InputLabel htmlFor="set-card-sort">
				Sort
			</InputLabel>
			<Select
				value={props.value}
				onChange={props.setSort}
				inputProps={{
					id: 'set-card-sort',
					name: 'Sort'
				}}
			>
			{ _.map(props.sortFields, (sortField) => {
				return (
					<MenuItem
						key={sortField}
						value={sortField}
					>
						{_.startCase(sortField)}
					</MenuItem>
				);
			}) }
			</Select>
		</FormControl>
	);
}

Sort.propTypes = {
	value: PropTypes.string.isRequired,
	sortFields: PropTypes.objectOf(PropTypes.string).isRequired,
	setSort: PropTypes.func.isRequired
};
