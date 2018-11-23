import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Decks from '../components/decks';
import {actions as decksActions} from '../redux/ducks/decks';
import {actions as deckBuilderActions} from '../redux/ducks/deck-builder';

function DecksContainer(props) {

	function Deck(deck) {
		this.id = deck.id;
		this.name = deck.name;
		this.cards = deck.cards;

		this.remove = this.remove.bind(this);
		this.setName = this.setName.bind(this);
		this.setCards = this.setCards.bind(this);
		this.select = this.select.bind(this);
		this.edit = this.edit.bind(this);
	}

	Deck.prototype.remove = function() {
		props.removeDeck(this.id);
	};

	Deck.prototype.setName = function(name) {
		props.setDeckName(this.id, name);
	};

	Deck.prototype.setCards = function(cards) {
		props.setDeckCards(this.id, cards);
	};

	Deck.prototype.select = function() {
		props.selectDeck(this);
	};

	Deck.prototype.edit = function() {
		props.editDeck(this);
	};

	const decks = _.map(props.decks, (deck) => new Deck(deck));

	return (
		<Decks
			decks={decks}
			selectedDeck={props.selectedDeck}
			createDeck={props.createDeck}
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
	removeDeck: decksActions.removeDeck,
	setDeckName: decksActions.setDeckName,
	setDeckCards: decksActions.setDeckCards,
	selectDeck: decksActions.selectDeck,
	toggle: decksActions.toggle,
	editDeck: deckBuilderActions.editDeck,
	createDeck: deckBuilderActions.createDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
