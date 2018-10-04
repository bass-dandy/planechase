import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Overlay from './containers/overlay/overlay.jsx';
import EternitiesMap from './containers/eternities-map/eternities-map.jsx';
import SingleDeck from './containers/single-deck/single-deck.jsx';
import store from './store.js';

const App = (props) => {
	return (
		<div>
			<Overlay />
			{props.children}
		</div>
	);
};

App.propTypes = {
	children: PropTypes.object
};

const initialState = {
	shouldShowCardSelector: false
};

ReactDOM.render((
	<Provider store={store(initialState)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="eternities-map" component={EternitiesMap}/>
				<Route path="single-deck" component={SingleDeck}/>
			</Route>
		</Router>
	</Provider>
), document.getElementById('root'));
