import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions } from '../../../modules/actions.js';
import MaterialIcon from '../../../shared/material-icon.jsx';

class DropdownMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.toggleVisibility = this.toggleVisibility.bind(this);
	}

	toggleVisibility() {
		this.setState({visible: !this.state.visible});
	}

	render() {
		const menu = (
			<div className="menu-wrapper" >
				<div className="menu" >
					<Link
						to="single-deck"
						className="menu-item"
					>
						Play Single Deck
					</Link>
					<Link
						to="eternities-map"
						className="menu-item"
					>
						Play Eternities Map
					</Link>
					<div className="menu-item" onClick={this.props.showCardSelector}>
						Edit Card Set
					</div>
				</div>
			</div>
		);

		return (
			<div className="dropdown-menu">
				<button
					className="dropdown-button"
					onClick={this.toggleVisibility}
				>
					<MaterialIcon name="menu" />
				</button>
				{this.state.visible ? menu : null}
			</div>
		);
	}
}

DropdownMenu.propTypes = {
	showCardSelector: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		showCardSelector() {
			dispatch(actions.showCardSelector());
		}
	};
}

export default connect(null, mapDispatchToProps)(DropdownMenu);
