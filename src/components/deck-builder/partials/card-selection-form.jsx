import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import produce from 'immer';

import CardList from './card-list';
import Sort from './sort';
import Filter from './filter';
import CARDS from '../../../cards.json';

const SORT_KEYS = {
	name: 'name',
	year: 'year',
	set: 'set',
	type: 'type'
};

function filterCards(cards, filters) {
	const filtersByFilterKey = _.reduce(filters, (acc, filter) => {
		const [filterKey, filterValue] = _.split(filter, ':');

		if (!acc[filterKey]) {
			acc[filterKey] = [];
		}
		acc[filterKey].push(filterValue);
		return acc;
	}, {});

	return _.filter(cards, (card) => {
		// only return cards that match every applied filter
		return _.every(filtersByFilterKey, (filterValue, filterKey) => {
			return _.includes(filterValue, card[filterKey]) || _.size(filterValue) === 0;
		});
	});
}

function sortCards(cards, sort) {
	const sortNameFn = (card) => {
		return card.name.startsWith('The') ? card.name.substring(4) : card.name;
	};

	if (sort === SORT_KEYS.name) {
		// If we group by name, there will be one group per name which is plain silly.
		// Handle this special case by just manually making one group called 'name'
		return { name: _.sortBy(cards, sortNameFn) };
	} else {
		return _.groupBy(
			// the sorted groups should internally be sorted by name
			_.sortBy(cards, [sort, sortNameFn]),
			sort
		);
	}
}

export default class CardSelectionForm extends React.Component {

	static propTypes = {
		deck: PropTypes.object
	}

	constructor(props) {
		super(props);

		// convert card array into object of form {id: bool} where bool represents selection state
		const selectedCards = _.reduce(CARDS, (acc, card, cardId) => {
			acc[cardId] = false;
			return acc;
		}, {});

		// if we are editing an existing deck, select cards previously added to deck
		if (props.deck) {
			_.forEach(props.deck.cards, (card) => {
				selectedCards[card.id] = true;
			});
		}

		this.state = {
			cards: sortCards(CARDS, SORT_KEYS.name),
			selectedCards,
			sort: SORT_KEYS.name,
			filters: [],
			previewCard: null
		};
	}

	get value() {
		return _.reduce(this.state.selectedCards, (acc, isChecked, cardId) => {
			if (isChecked) {
				acc.push(CARDS[cardId]);
			}
			return acc;
		}, []);
	}

	onSelectCard = (cardId) => {
		this.setState({
			selectedCards: produce(this.state.selectedCards, (draft) => {
				draft[cardId] = !draft[cardId];
			})
		});
	}

	onCardHover = (card) => {
		this.setState({previewCard: card});
	}

	setSort = (sort) => {
		this.setState({
			sort,
			cards: sortCards(
				filterCards(CARDS, this.state.filters),
				sort
			)
		});

		this.list.resetScroll();
	}

	setFilters = (filters) => {
		this.setState({
			filters,
			cards: sortCards(
				filterCards(CARDS, filters),
				this.state.sort
			)
		});

		this.list.resetScroll();
	}

	render() {
		return (
			<div className="card-selection-form">
				<div className="card-selector">
					<div className="filter-list">
						<Sort
							sortKeys={SORT_KEYS}
							sort={this.state.sort}
							setSort={this.setSort}
						/>
						<Filter
							filters={this.state.filters}
							setFilters={this.setFilters}
						/>
					</div>
					<CardList
						ref={(e) => { this.list = e; }}
						cardsByGroup={this.state.cards}
						selectedCards={this.state.selectedCards}
						onSelectCard={this.onSelectCard}
						onCardHover={this.onCardHover}
					/>
				</div>
				<img
					className="card-preview"
					src={_.get(this.state, 'previewCard.url', 'img/card-back.jpg')}
				/>
			</div>
		);
	}
}
