import React from 'react';
import { Link } from 'react-router';

import CardSelector from './card-selector.jsx';
import MaterialIcon from './material-icon.jsx';

export default class DropdownMenu extends React.Component {

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
						Single Deck
					</Link>
					<Link
						to="eternities-map"
						className="menu-item"
					>
						Eternities Map
					</Link>
					<div className="menu-item">
						<CardSelector />
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
