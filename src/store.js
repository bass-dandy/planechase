import {createStore} from 'redux';

import reducers from './modules/reducers';

export default (initialState = {}) => {

	return createStore(
		reducers,
		initialState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
};
