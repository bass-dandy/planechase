import React from 'react';
import _ from 'lodash';

import Decks from './partials/decks';
import MainDeck from './partials/main-deck';
import Pinboard from './partials/pinboard';

export default class DeckDashboard extends React.Component {

	state = {
		decks: [],
		pinnedCards: [],
		mainDeckId: ''
	}

	addDeck = () => {
		const id = Date.now();
		const self = this;

		this.setState({
			decks: _.concat(this.state.decks, {
				id,
				name: '',
				cards: [],
				edit(change) {
					self.editDeck(id, change);
				},
				planeswalk() {
					self.planeswalkDeck(id);
				},
				remove() {
					self.removeDeck(id);
				},
				save() {
					self.saveDeck(id);
				},
				shuffle() {
					self.shuffleDeck(id);
				}
			})
		});
	}

	removeDeck = (id) => {
		this.setState({
			decks: _.reject(this.state.decks, {id})
		});
	}

	_updateDeck = (id, updateFn) => {
		this.setState({
			decks: _.map(this.state.decks, (deck) => {
				let newDeck = deck;
				if (id === deck.id) {
					newDeck = _.clone(deck);
					updateFn(newDeck);
				}
				return newDeck;
			})
		});

	}

	editDeck = (id, change) => {
		this._updateDeck(id, (deck) => {
			deck.name = change.name || deck.name;
			deck.cards = change.cards || deck.cards;
		});
	}

	planeswalkDeck = (id) => {
		this._updateDeck(id, (deck) => {
			deck.cards = _.concat(
				_.tail(deck.cards),
				_.head(deck.cards)
			)
		});
	}

	saveDeck = (id) => {
		// TODO: save to localStorage
	}

	shuffleDeck = (id) => {
		this._updateDeck(id, (deck) => {
			deck.cards = _.shuffle(deck.cards);
		});
	}

	pinCard = (card) => {
		this.setState({
			pinnedCards: _.union(this.state.pinnedCards, [card])
		});
	}

	unpinCard = (card) => {
		this.setState({
			pinnedCards: _.without(this.state.pinnedCards, card)
		});
	}

	setMainDeckId = (id) => {
		this.setState({mainDeckId: id});
	}

	render() {
		return (
			<div>
				<MainDeck
					deck={_.find(this.state.decks, {id: this.state.mainDeckId})}
					pinCard={this.pinCard}
				/>
				<Decks
					decks={this.state.decks}
					addDeck={this.addDeck}
					setMainDeckId={this.setMainDeckId}
				/>
				<Pinboard
					cards={this.state.pinnedCards}
					unpinCard={this.unpinCard}
				/>
			</div>
		);
	}
}
