import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Decks from '../components/decks';
import {actions} from '../redux/ducks/decks';

function DecksContainer(props) {
	const decks = _.map(props.decks, (deck) => {
		return {
			...deck,
			remove() {
				props.removeDeck(deck.id);
			},
			setName(name) {
				props.setDeckName(deck.id, name);
			},
			setCards(cards) {
				props.setDeckCards(deck.id, cards);
			},
			select() {
				props.selectDeck(deck);
			}
		};
	});

	return (
		<Decks
			decks={decks}
			selectedDeck={props.selectedDeck}
			addDeck={props.addDeck}
			toggle={props.toggle}
		/>
	);
}

function mapStateToProps(state) {
	return {
		decks: state.decks.decks,
		selectedDeck: state.decks.selectedDeck
	};
}

const mapDispatchToProps = {
	addDeck: actions.addDeck,
	removeDeck: actions.removeDeck,
	setDeckName: actions.setDeckName,
	setDeckCards: actions.setDeckCards,
	selectDeck: actions.selectDeck,
	toggle: actions.toggle
};

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
