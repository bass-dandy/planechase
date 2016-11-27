import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import DropdownMenu from './shared/dropdown-menu.jsx';
import EternitiesMap from './containers/eternities-map/eternities-map.jsx';
import SingleDeck from './containers/single-deck/single-deck.jsx';
import store from './store.js';

const App = (props) => {
	return (
		<div>
			<DropdownMenu />
			{props.children}
		</div>
	);
};

App.propTypes = {
	children: React.PropTypes.object
};

const initialState = {};

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
