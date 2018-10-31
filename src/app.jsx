import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {Drawer, Tabs, Tab} from '@material-ui/core';

import Decks from './containers/decks';
import Vanilla from './containers/vanilla';
import EternitiesMap from './containers/eternities-map';
import Nav from './components/nav';
import {actions} from './redux/ducks/decks';

class App extends React.Component {

	state = {
		tab: 0
	}

	render() {
		return (
			<>
				<Drawer
					variant="persistent"
					anchor="left"
					open={this.props.sidebarOpen}
				>
					<Decks/>
				</Drawer>
				<div
					className={
						classnames('main', {
							'sidebar-open': this.props.sidebarOpen
						})
					}
				>
					<Nav
						toggleSidebar={this.props.toggleSidebar}
						sidebarOpen={this.props.sidebarOpen}
					>
						<Tabs
							value={this.state.tab}
							onChange={(e, value) => this.setState({tab: value})}
						>
							<Tab label="Vanilla"/>
							<Tab label="Eternities"/>
						</Tabs>
					</Nav>
					<div className="tab-content">
						{ this.state.tab === 0 && <Vanilla/> }
						{ this.state.tab === 1 && <EternitiesMap/> }
					</div>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		sidebarOpen: state.decks.show
	};
}

const mapDispatchToProps = {
	toggleSidebar: actions.toggle
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
