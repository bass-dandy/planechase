import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {List, ListSubheader, ListItem, ListItemText, Checkbox, RootRef} from '@material-ui/core';

import Sort from './partials/sort';
import CARDS from '../../cards.json';

const SORT_FIELDS = {
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
		}, {})

		// select cards previously added to deck
		_.forEach(props.deck.cards, (card) => {
			selectedCards[card.id] = true;
		});

		this.state = {
			selectedCards,
			sort: SORT_FIELDS.name
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

	onCheck = (cardId) => {
		this.setState((prevState) => {
			return {
				selectedCards: _.set(
					prevState.selectedCards,
					cardId,
					!prevState.selectedCards[cardId]
				)
			};
		});
	}

	setSort = (e) => {
		this.setState({sort: e.target.value});
		this.list.scrollTop = 0;
	}

	render() {
		const sortedCards = this.state.sort === SORT_FIELDS.name ? {
			name: _.sortBy(CARDS, 'name')
		} : _.groupBy(
			_.sortBy(CARDS, [this.state.sort, 'name']),
			this.state.sort
		);

		return (
			<div className="card-selection-form">
				<Sort
					value={this.state.sort}
					sortFields={SORT_FIELDS}
					setSort={this.setSort}
				/>
				<RootRef rootRef={(e) => { this.list = e; }}>
					<List className="card-list">
						{ _.map(sortedCards, (cards, sortField) => (
							<li key={`section-${sortField}`}>
								<ul className="card-sublist">
									<ListSubheader className="card-sublist-header">
										{_.startCase(sortField)}
									</ListSubheader>
									{ _.map(cards, (card) => (
										<ListItem
											key={card.id}
											className="card-list-item"
											dense
											button
											onClick={() => this.onCheck(card.id)}
										>
											<Checkbox
												checked={this.state.selectedCards[card.id]}
												disableRipple
												tabIndex={-1}
											/>
											<ListItemText primary={card.name}/>
										</ListItem>
									)) }
								</ul>
							</li>
						)) }
					</List>
				</RootRef>
			</div>
		);
	}
}
