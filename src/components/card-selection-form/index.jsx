import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CardList from './partials/card-list';
import Sort from './partials/sort';
import Filter from './partials/filter';
import CARDS from '../../cards.json';

const SORT_KEYS = {
	name: 'name',
	year: 'year',
	set: 'set',
	type: 'type'
};

export default class CardSelectionForm extends React.Component {

	static propTypes = {
		deck: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);

		// convert card array into object of form {id: bool} where bool represents selection state
		const selectedCards = _.reduce(CARDS, (acc, card, cardId) => {
			acc[cardId] = false;
			return acc;
		}, {});

		// select cards previously added to deck
		_.forEach(props.deck.cards, (card) => {
			selectedCards[card.id] = true;
		});

		this.state = {
			selectedCards,
			sort: SORT_KEYS.name,
			filters: {},
			previewCard: null
		};
	}

	// public method for submitting this form through some other form
	submit = () => {
		this.props.deck.edit({
			cards: _.reduce(this.state.selectedCards, (acc, isChecked, cardId) => {
				if (isChecked) {
					acc.push(CARDS[cardId]);
				}
				return acc;
			}, [])
		});
	}

	onSelectCard = (cardId) => {
		this.setState((prevState) => {
			return {
				selectedCards: {
					...prevState.selectedCards,
					[cardId]: !prevState.selectedCards[cardId]
				}
			};
		});
	}

	onCardHover = (card) => {
		this.setState({previewCard: card});
	}

	setSort = (sort) => {
		this.setState({sort});
		this.list.resetScroll();
	}

	setFilter = (filter, values) => {
		this.setState({
			filters: {
				...this.state.filters,
				[filter]: values
			}
		});
		this.list.resetScroll();
	}

	filterCards(cards) {
		return _.filter(cards, (card) => {
			// only return cards that match every applied filter
			return _.every(this.state.filters, (filterValue, filterKey) => {
				return _.includes(filterValue, card[filterKey]) || _.size(filterValue) === 0;
			});
		});
	}

	sortCards(cards) {
		const sortNameFn = (card) => {
			return card.name.startsWith('The') ? card.name.substring(4) : card.name;
		};

		if (this.state.sort === SORT_KEYS.name) {
			// If we group by name, there will be one group per name which is plain silly.
			// Handle this special case by just manually making one group called 'name'
			return { name: _.sortBy(cards, sortNameFn) };
		} else {
			return _.groupBy(
				// the sorted groups should internally be sorted by name
				_.sortBy(cards, [this.state.sort, sortNameFn]),
				this.state.sort
			);
		}
	}

	render() {
		const filteredCards = this.filterCards(CARDS);
		const sortedCards = this.sortCards(filteredCards);

		return (
			<div className="card-selection-form">
				<div className="filter-list">
					<Sort
						sortKeys={SORT_KEYS}
						sort={this.state.sort}
						setSort={this.setSort}
					/>
					<Filter
						filters={this.state.filters}
						setFilter={this.setFilter}
					/>
				</div>
				<CardList
					ref={(e) => { this.list = e; }}
					cardsByGroup={sortedCards}
					selectedCards={this.state.selectedCards}
					onSelectCard={this.onSelectCard}
					onCardHover={this.onCardHover}
				/>
				<img
					className="card-preview"
					src={`${this.state.previewCard ? this.state.previewCard.url : 'img/card-back.jpg'}`}
				/>
			</div>
		);
	}
}
