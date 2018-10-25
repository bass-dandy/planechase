import _ from 'lodash';
import produce from 'immer';
import {types as decksTypes} from './decks';

/*
	decks shape:
	{
		[deck.id]: {
			id: '',
			deckCards: [],
			pinnedCards: []
		},
		...
	}
*/
const DEFAULT_STATE = {
	decks: {}
};

export const types = {
	PIN_CARD: 'vanilla/pin-card',
	UNPIN_CARD: 'vanilla/unpin-card',
	PLANESWALK: 'vanilla/planeswalk',
	SHUFFLE: 'vanilla/shuffle'
};

export const actions = {
	pinCard(deckId) {
		return {
			type: types.PIN_CARD,
			payload: {deckId}
		};
	},
	unpinCard(deckId, card) {
		return {
			type: types.UNPIN_CARD,
			payload: {deckId, card}
		};
	},
	planeswalk(deckId) {
		return {
			type: types.PLANESWALK,
			payload: {deckId}
		};
	},
	shuffle(deckId) {
		return {
			type: types.SHUFFLE,
			payload: {deckId}
		};
	}
};

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
	return produce(state, (draft) => {
		switch (type) {
			case types.PIN_CARD: {
				const deck = draft.decks[payload.deckId];

				deck.pinnedCards.push(
					deck.deckCards.shift()
				);
				break;
			}
			case types.UNPIN_CARD: {
				const deck = draft.decks[payload.deckId];

				deck.deckCards.push(payload.card);
				_.remove(deck.pinnedCards, (pinnedCard) => pinnedCard.id === payload.card.id);
				break;
			}
			case types.PLANESWALK: {
				const deck = draft.decks[payload.deckId];

				deck.deckCards.push(deck.deckCards.shift());
				break;
			}
			case types.SHUFFLE: {
				const deck = draft.decks[payload.deckId];

				deck.deckCards = _.shuffle(deck.deckCards);
				break;
			}
			case decksTypes.SELECT_DECK: {
				// if deck has never been selected before, we need to add it to the state
				if (!state.decks[payload.id]) {
					draft.decks[payload.id] = {
						id: payload.id,
						deckCards: _.shuffle(payload.cards),
						pinnedCards: []
					};
				}
				break;
			}
			case decksTypes.SET_DECK_CARDS: {
				// if we edited a previously (or currently) selected deck, reset the deck with new cards
				if (state.decks[payload.id]) {
					draft.decks[payload.id].deckCards = _.shuffle(payload.cards);
					draft.decks[payload.id].pinnedCards = [];
				}
			}
		}
	});
}
