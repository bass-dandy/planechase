import React from 'react';

import {Tabs, Tab} from '@material-ui/core';

import DeckDashboard from './components/deck-dashboard';
import EternitiesMap from './components/eternities-map';
import Nav from './components/nav';

export default class App extends React.Component {

	state = {
		tab: 0
	}

	render() {
		return (
			<div className="main">
				<Nav>
					<Tabs
						value={this.state.tab}
						onChange={(e, value) => this.setState({tab: value})}
					>
						<Tab label="Vanilla"/>
						<Tab label="Eternities Map"/>
					</Tabs>
				</Nav>
				<div className="tab-content">
					{ this.state.tab === 0 && <DeckDashboard/> }
					{ this.state.tab === 1 && <EternitiesMap/> }
				</div>
			</div>
		);
	}
}
