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
				value={props.sort}
				onChange={(e) => props.setSort(e.target.value)}
				inputProps={{
					id: 'set-card-sort',
					name: 'Sort'
				}}
			>
			{ _.map(props.sortKeys, (sortField) => {
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
	sortKeys: PropTypes.objectOf(PropTypes.string).isRequired,
	sort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired
};
