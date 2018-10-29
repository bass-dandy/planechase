import _ from 'lodash';
import produce from 'immer';
import {types as decksTypes} from './decks';

import {getDistance, getCoords} from '../../lib/eternities-map';

const MAX_DISTANCE = 3;

const DEFAULT_STATE = {
	map: {}, // shape: { 'x,y': card }
	deck: {}, // shape: { id, cards }
	currentPos: null // shape: { x, y }
};

export const types = {
	PLANESWALK: 'eternities-map/planeswalk'
};

export const actions = {
	planeswalk(x, y) {
		return {
			type: types.PLANESWALK,
			payload: {x, y}
		};
	}
};

export default function reducer(state = DEFAULT_STATE, {type, payload}) {

	return produce(state, (draft) => {

		const placeCard = (x, y) => {
			const key = `${x},${y}`;

			if (!draft.map[key]) {
				draft.map[key] = draft.deck.cards.shift();
			}
		};

		const planeswalk = (x, y) => {
			placeCard(x, y);

			// place cards in empty cardinal directions
			placeCard(x + 1, y);
			placeCard(x - 1, y);
			placeCard(x, y + 1);
			placeCard(x, y - 1);

			// move to new coords
			draft.currentPos = {x, y};

			// prune cards greater than MAX_DISTANCE from new position and shuffle them back in
			_.forEach(draft.map, (card, key) => {
				if (getDistance(draft.currentPos, getCoords(key)) > MAX_DISTANCE) {
					draft.deck.cards.push(card);
					draft.deck.cards = _.shuffle(draft.deck.cards);
					delete draft.map[key];
				}
			});
		};

		switch (type) {
			case types.PLANESWALK: {
				planeswalk(payload.x, payload.y);
				break;
			}
			case decksTypes.SELECT_DECK: {
				// if we select a new deck, start a new game
				draft.deck = {
					id: payload.id,
					cards: _.shuffle(payload.cards)
				};
				draft.map = {};
				planeswalk(0, 0);
				break;
			}
			case decksTypes.SET_DECK_CARDS: {
				// if we edited the selected deck, start a new game
				if (state.deck.id === payload.id) {
					draft.deck.cards = _.shuffle(payload.cards);
					draft.map = {};
					planeswalk(0, 0);
				}
			}
		}
	});
}
