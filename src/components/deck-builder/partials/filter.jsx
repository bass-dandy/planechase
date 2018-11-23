import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Checkbox
} from '@material-ui/core';

import CARDS from '../../../cards.json';

// the card keys we want to be able to filter on
const FILTER_KEYS = ['year', 'type', 'set'];

// the values we want to be able to filter for (by card key)
const FILTER_VALUES_FOR_KEY = {};

// populate the filter values
_.forEach(FILTER_KEYS, (filterKey) => {
	FILTER_VALUES_FOR_KEY[filterKey] = [];

	_.forEach(CARDS, (card) => {
		FILTER_VALUES_FOR_KEY[filterKey].push(card[filterKey]);
	});

	FILTER_VALUES_FOR_KEY[filterKey] = _.uniq(FILTER_VALUES_FOR_KEY[filterKey]);
});

export default function Filter(props) {
	const menuItems = [];

	_.forEach(FILTER_KEYS, (filterKey) => {
		// a bit of a hack to give us a "header" for each filter category
		menuItems.push(
			<MenuItem
				key={filterKey}
				disabled
				classes={{ root: 'filter-header' }}
			>
				{filterKey}
			</MenuItem>
		);

		// then push each value for the filter category
		_.forEach(FILTER_VALUES_FOR_KEY[filterKey], (filterValue) => {
			menuItems.push(
				<MenuItem
					key={filterValue}
					value={`${filterKey}:${filterValue}`}
					classes={{ root: 'filter-option' }}
				>
					<Checkbox
						color="secondary"
						checked={_.includes(props.filters, `${filterKey}:${filterValue}`)}
					/>
					{filterValue}
				</MenuItem>
			);
		});
	});

	return (
		<FormControl className="card-filter">
			<InputLabel htmlFor="set-card-filter">
				Filter
			</InputLabel>
			<Select
				multiple
				value={props.filters}
				inputProps={{
					id: 'set-card-filter',
					name: 'Filter'
				}}
				onChange={(e) => props.setFilters(e.target.value)}
				renderValue={(values) => values.map((value) => value.split(':')[1]).join(', ')}
			>
				{menuItems}
			</Select>
		</FormControl>
	);
}

Filter.propTypes = {
	filters: PropTypes.arrayOf(PropTypes.string).isRequired,
	setFilters: PropTypes.func.isRequired
};
