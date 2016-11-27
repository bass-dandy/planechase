import { ACTION_TYPES } from './constants.js';

export default function reduce(state = {}, action) {
	switch (action.type) {
		case ACTION_TYPES.SET_CARD_POOL:
			return {
				cardPool: action.payload
			};
		default:
			return state;
	}
}
