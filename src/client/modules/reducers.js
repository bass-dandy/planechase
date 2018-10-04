import _ from 'lodash';
import { ACTION_TYPES } from './constants.js';

export default function reduce(state = {}, action) {
	const nextState = _.cloneDeep(state);

	switch (action.type) {
		case ACTION_TYPES.SET_CARD_POOL:
			return _.assign(nextState, {
				cardPool: action.payload
			});
		case ACTION_TYPES.SHOW_CARD_SELECTOR:
			return _.assign(nextState, {
				shouldShowCardSelector: true
			});
		case ACTION_TYPES.HIDE_CARD_SELECTOR:
			return _.assign(nextState, {
				shouldShowCardSelector: false
			});
		default:
			return state;
	}
}
