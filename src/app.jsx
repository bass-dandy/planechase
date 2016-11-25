import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import EternitiesMap from './containers/eternities-map/eternities-map.jsx';
import SingleDeck from './containers/single-deck/single-deck.jsx';

const App = (props) => {
	return (
		<div>
			App
			<Link to="single-deck">
				Single Deck
			</Link>
			<Link to="eternities-map">
				Eternities Map
			</Link>
			{props.children}
		</div>
	);
};

App.propTypes = {
	children: React.PropTypes.object
};

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="eternities-map" component={EternitiesMap}/>
			<Route path="single-deck" component={SingleDeck}/>
		</Route>
	</Router>
), document.getElementById('root'));

