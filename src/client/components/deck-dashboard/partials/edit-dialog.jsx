import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import CardList from '../../card-list';
import request from '../../../lib/http-client';

export default class EditDialog extends React.Component {

	static propTypes = {
		open: PropTypes.bool,
		onClose: PropTypes.func.isRequired,
		deck: PropTypes.object.isRequired
	}

	state = {
		name: '',
		cards: {}
	}

	onEnter = () => {
		const {cards} = this.state;

		// select cards previously added to deck
		_.forEach(this.props.deck.cards, (card) => {
			cards[card] = true;
		});

		this.setState({cards});
	}

	onClose = () => {
		// uncheck all cards
		this.setState({
			cards: _.mapValues(this.state.cards, () => false)
		});
		this.props.onClose();
	}

	onCheck = (card) => {
		this.setState({
			cards: _.set(this.state.cards, card, !this.state.cards[card])
		});
	}

	submit = () => {
		this.props.deck.edit({
			name: this.state.name,
			cards: _.reduce(this.state.cards, (acc, isChecked, card) => {
				if (isChecked) {
					acc.push(card);
				}
				return acc;
			}, [])
		});
		this.onClose();
	}

	componentDidMount() {
		this.setState({name: this.props.deck.name});

		request
			.get('./api/card-urls')
			.then((res) => {
				// convert card url array into object of form {url: bool} where bool represents selection state
				this.setState({
					cards: _.reduce(res, (acc, card) => {
						acc[card] = false;
						return acc;
					}, {})
				});
			});
	}

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.onClose}
				onEnter={this.onEnter}
			>
				<DialogTitle>Edit Deck</DialogTitle>
				<DialogContent>
					<TextField
						className="edit-deck-name"
						label="Deck Name"
						value={this.state.name}
						onChange={(e) => this.setState({ name: e.target.value })}
					/>
				</DialogContent>
				<CardList
					cards={this.state.cards}
					onCheck={this.onCheck}
				/>
				<DialogActions>
					<Button onClick={this.onClose}>
						Cancel
					</Button>
					<Button onClick={this.submit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
