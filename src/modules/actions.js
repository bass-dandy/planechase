import { ACTION_TYPES } from './constants.js';

function setCardPool(cardPool) {
	return {
		type: ACTION_TYPES.SET_CARD_POOL,
		payload: cardPool
	};
}

function showCardSelector() {
	return {
		type: ACTION_TYPES.SHOW_CARD_SELECTOR
	};
}

function hideCardSelector() {
	return {
		type: ACTION_TYPES.HIDE_CARD_SELECTOR
	};
}

export const actions = {
	setCardPool,
	showCardSelector,
	hideCardSelector
};
