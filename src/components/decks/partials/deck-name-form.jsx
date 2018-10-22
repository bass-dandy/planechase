import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';

export default class DeckNameForm extends React.Component {

	static propTypes = {
		deck: PropTypes.object.isRequired
	}

	state = { name: this.props.deck.name }

	// public method for submitting this form through some other form
	submit = () => {
		this.props.deck.setName(this.state.name);
	}

	render() {
		return (
			<TextField
				className="edit-deck-name"
				label="Deck Name"
				value={this.state.name}
				onChange={(e) => this.setState({ name: e.target.value })}
			/>
		);
	}
}
