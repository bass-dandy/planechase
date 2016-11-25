import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import SingleDeck from './containers/single-deck/single-deck.jsx';

const App = (props) => {
	return (
		<div>
			App
			<Link to="single-deck">link</Link>
			{props.children}
		</div>
	);
};

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="single-deck" component={SingleDeck}/>
		</Route>
	</Router>
), document.getElementById('root'));

