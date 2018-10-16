import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';

import CARDS from '../../../cards.json';

// the card keys we want to be able to filter on
const FILTER_KEYS = ['year', 'set', 'type'];

// the values we want to be able to filter for (by card key)
const FILTER_VALUES_FOR_KEY = {
	year: [],
	set: [],
	type: []
};

// populate the filter values
_.forEach(CARDS, (card) => {
	_.forEach(FILTER_KEYS, (filterKey) => {
		FILTER_VALUES_FOR_KEY[filterKey].push(card[filterKey]);
	});
});

_.forEach(FILTER_KEYS, (filterKey) => {
	FILTER_VALUES_FOR_KEY[filterKey] = _.uniq(FILTER_VALUES_FOR_KEY[filterKey]);
});

export default function Filter(props) {
	return _.map(FILTER_KEYS, (filterKey) => (
		<FormControl
			key={filterKey}
			className="card-filter"
		>
			<InputLabel htmlFor={`set-card-filter-${filterKey}`}>
				{_.startCase(filterKey)}
			</InputLabel>
			<Select
				multiple
				value={_.get(props, `filters[${filterKey}]`, [])}
				onChange={(e) => props.setFilter(filterKey, e.target.value)}
				inputProps={{
					id: `set-card-filter-${filterKey}`,
					name: filterKey
				}}
			>
			{ _.map(FILTER_VALUES_FOR_KEY[filterKey], (filterValue) => (
				<MenuItem
					key={filterValue}
					value={filterValue}
				>
					{_.startCase(filterValue)}
				</MenuItem>
			)) }
			</Select>
		</FormControl>
	));
}

Filter.propTypes = {
	filters: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	setFilter: PropTypes.func.isRequired
};
