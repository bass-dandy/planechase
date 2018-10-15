import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {List, ListItem, ListItemText, Checkbox} from '@material-ui/core';

import CARDS from '../../cards.json';

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
			selectedCards
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

	render() {
		return (
			<List className="card-list">
				{ _.map(this.state.selectedCards, (isChecked, cardId) => {
					return (
						<ListItem
							key={cardId}
							dense
							button
							onClick={() => this.onCheck(cardId)}
						>
							<Checkbox
								checked={isChecked}
								disableRipple
								tabIndex={-1}
							/>
							<ListItemText primary={CARDS[cardId].name}/>
						</ListItem>
					);
				}) }
			</List>
		);
	}
}
