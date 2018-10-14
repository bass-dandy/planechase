import React from 'react';
import _ from 'lodash';

import Decks from './partials/decks';
import MainDeck from './partials/main-deck';
import Pinboard from './partials/pinboard';

import CARDS from '../../cards.json';

export default class DeckDashboard extends React.Component {

	state = {
		decks: [],
		pinnedCards: [],
		mainDeckId: ''
	}

	addDeck = (id = Date.now(), name = '', cards = []) => {
		const self = this;

		this.setState((prevState) => {
			return {
				decks: [...prevState.decks, {
					id,
					name,
					cards,
					edit(change) {
						self.editDeck(id, change);
					},
					planeswalk() {
						self.planeswalkDeck(id);
					},
					remove() {
						self.removeDeck(id);
					},
					shuffle() {
						self.shuffleDeck(id);
					}
				}]
			}
		});
	}

	removeDeck = (id) => {
		this.setState((prevState) => {
			return {
				decks: _.reject(prevState.decks, {id})
			};
		});

		// save changes to localStorage
		const savedDecksJSON = localStorage.getItem('savedDecks');
		let savedDecks = {};

		if (savedDecksJSON) {
			savedDecks = _.omit(JSON.parse(savedDecksJSON), id);
			localStorage.setItem('savedDecks', JSON.stringify(savedDecks));
		}
	}

	_updateDeck = (id, updateFn, callback = _.noop) => {
		this.setState((prevState) => {
			return {
				decks: _.map(prevState.decks, (deck) => {
					let newDeck = deck;
					if (id === deck.id) {
						newDeck = _.clone(deck);
						updateFn(newDeck);
					}
					return newDeck;
				})
			};
		}, callback);
	}

	editDeck = (id, change) => {
		this._updateDeck(id, (deck) => {
			deck.name = change.name || deck.name;
			deck.cards = change.cards || deck.cards;
		}, () => {
			// save changes to localStorage
			const savedDecksJSON = localStorage.getItem('savedDecks');
			let savedDecks = {};

			if (savedDecksJSON) {
				savedDecks = JSON.parse(savedDecksJSON);
			}

			const deckToSave = _.find(this.state.decks, {id});

			savedDecks[id] = {
				name: deckToSave.name,
				cards: _.map(deckToSave.cards, 'id')
			};

			localStorage.setItem('savedDecks', JSON.stringify(savedDecks));
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

	shuffleDeck = (id) => {
		this._updateDeck(id, (deck) => {
			deck.cards = _.shuffle(deck.cards);
		});
	}

	pinCard = (card) => {
		this.setState((prevState) => {
			return {
				pinnedCards: _.unionBy(prevState.pinnedCards, [card], 'name')
			};
		});
	}

	unpinCard = (card) => {
		this.setState((prevState) => {
			return {
				pinnedCards: _.filter(prevState.pinnedCards, (pinnedCard) => pinnedCard.name !== card.name)
			};
		});
	}

	setMainDeckId = (id) => {
		this.setState({mainDeckId: id});
	}

	componentDidMount() {
		// hydrate deck list from localStorage if able
		const savedDecksJSON = localStorage.getItem('savedDecks');

		if (savedDecksJSON) {
			const savedDecks = JSON.parse(savedDecksJSON);
			_.forEach(savedDecks, (deck, id) => {
				this.addDeck(
					id,
					deck.name,
					_.map(deck.cards, (cardId) => CARDS[cardId])
				);
			});
		}
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
