import {applyMiddleware, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';

import reducers from './modules/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
	level: 'info',
	timestamp: false
});

export default (initialState = {}) => {
	return createStore(
		reducers,
		initialState,
		composeEnhancers(applyMiddleware(logger))
	);
};
