import _ from 'lodash';
import produce from 'immer';
import CARDS from '../../cards.json';

const DEFAULT_STATE = {
	decks: [],
	selectedDeck: null,
	show: true
};

// hydrate deck list from localStorage if able
const savedDecksJSON = localStorage.getItem('savedDecks');

if (savedDecksJSON) {
	const savedDecks = JSON.parse(savedDecksJSON);
	_.forEach(savedDecks, (deck) => {
		DEFAULT_STATE.decks.push({
			id: deck.id,
			name: deck.name,
			cards: _.map(deck.cards, (cardId) => CARDS[cardId])
		});
	});
}

export const types = {
	ADD_DECK: 'decks/add-deck',
	REMOVE_DECK: 'decks/remove-deck',
	SET_DECK_NAME: 'decks/set-deck-name',
	SET_DECK_CARDS: 'decks/set-deck-cards',
	SELECT_DECK: 'decks/select-deck',
	TOGGLE: 'decks/toggle'
};

export const actions = {
	addDeck() {
		return {
			type: types.ADD_DECK
		};
	},
	removeDeck(id) {
		return {
			type: types.REMOVE_DECK,
			payload: id
		};
	},
	setDeckName(id, name) {
		return {
			type: types.SET_DECK_NAME,
			payload: {id, name}
		};
	},
	setDeckCards(id, cards) {
		return {
			type: types.SET_DECK_CARDS,
			payload: {id, cards}
		};
	},
	selectDeck(deck) {
		return {
			type: types.SELECT_DECK,
			payload: deck
		};
	},
	toggle() {
		return {
			type: types.TOGGLE
		};
	}
};

// save changes to localStorage
function saveDecks(decks) {
	const savedDecks = _.map(decks, (deck) => {
		return {
			...deck,
			cards: _.map(deck.cards, 'id')
		};
	});
	localStorage.setItem('savedDecks', JSON.stringify(savedDecks));
}

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
	return produce(state, (draft) => {
		switch (type) {
			case types.ADD_DECK: {
				draft.decks.push({
					id: Date.now(),
					name: '',
					cards: []
				});
				saveDecks(draft.decks);
				break;
			}
			case types.REMOVE_DECK: {
				const id = payload;
				_.remove(draft.decks, (deck) => deck.id === id);
				saveDecks(draft.decks);
				break;
			}
			case types.SET_DECK_NAME: {
				const deck = _.find(draft.decks, {id: payload.id});
				_.set(deck, 'name', payload.name);
				saveDecks(draft.decks);
				break;
			}
			case types.SET_DECK_CARDS: {
				const deck = _.find(draft.decks, {id: payload.id});
				_.set(deck, 'cards', payload.cards);
				saveDecks(draft.decks);

				// if we just edited the selected deck, deselect it
				if (state.selectedDeck && state.selectedDeck.id === deck.id) {
					draft.selectedDeck = null;
				}
				break;
			}
			case types.SELECT_DECK: {
				draft.selectedDeck = payload;
				break;
			}
			case types.TOGGLE: {
				draft.show = !state.show;
				break;
			}
		}
	});
}
