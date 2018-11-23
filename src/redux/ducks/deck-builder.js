import produce from 'immer';

export const types = {
	EDIT_DECK: 'deck-builder/edit-deck',
	CREATE_DECK: 'deck-builder/create-deck',
	CLOSE_DECK_BUILDER: 'deck-builder/close-deck-builder'
};

export const actions = {
	editDeck(deck) {
		return {
			type: types.EDIT_DECK,
			payload: {deck}
		};
	},
	createDeck() {
		return {
			type: types.CREATE_DECK
		};
	},
	closeDeckBuilder() {
		return {
			type: types.CLOSE_DECK_BUILDER
		};
	}
};

const DEFAULT_STATE = {
	open: false,
	deck: null
};

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
	return produce(state, (draft) => {
		switch (type) {
			case types.EDIT_DECK: {
				draft.open = true;
				draft.deck = payload.deck;
				break;
			}
			case types.CREATE_DECK: {
				draft.open = true;
				break;
			}
			case types.CLOSE_DECK_BUILDER: {
				draft.open = false;
				draft.deck = null;
				break;
			}
		}
	});
}
