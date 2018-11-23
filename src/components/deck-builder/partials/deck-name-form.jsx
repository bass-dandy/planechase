import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {TextField} from '@material-ui/core';

export default class DeckNameForm extends React.Component {

	static propTypes = {
		deck: PropTypes.object
	}

	state = {
		name: _.get(this.props, 'deck.name', '')
	}

	get value() {
		return this.state.name;
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
