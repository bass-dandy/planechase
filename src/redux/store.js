import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';

import decks from './ducks/decks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
	level: 'info',
	timestamp: false
});

const reducer = combineReducers({
	decks
});

const initialState = {};

export default createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(logger))
);
