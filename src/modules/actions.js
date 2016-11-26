import { ACTION_TYPES } from './constants.js';

function setCardPool(cardPool) {
	return {
		type: ACTION_TYPES.SET_CARD_POOL,
		payload: cardPool
	};
}

export const actions = {
	setCardPool
};
