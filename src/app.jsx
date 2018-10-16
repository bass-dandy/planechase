import React from 'react';

import {Tabs, Tab} from '@material-ui/core';

import DeckDashboard from './components/deck-dashboard';
import EternitiesMap from './components/eternities-map';
import Nav from './components/nav';

export default class App extends React.Component {

	state = {
		navHeight: 0,
		tab: 0
	}

	render() {
		return (
			<>
				<Nav onResize={(height) => this.setState({navHeight: height})}>
					<Tabs
						value={this.state.tab}
						onChange={(e, value) => this.setState({tab: value})}
					>
						<Tab label="Vanilla"/>
						<Tab label="Eternities Map"/>
					</Tabs>
				</Nav>
				<div
					style={{
						position: 'absolute',
						top: this.state.navHeight,
						left: 0,
						right: 0,
						bottom: 0
					}}
				>
					{ this.state.tab === 0 && <DeckDashboard/> }
					{ this.state.tab === 1 && <EternitiesMap/> }
				</div>
			</>
		);
	}
}
