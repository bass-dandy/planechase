import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import CardList from '../../card-list';
import CARDS from '../../../cards.json';

export default class EditDialog extends React.Component {

	static propTypes = {
		open: PropTypes.bool,
		onClose: PropTypes.func.isRequired,
		deck: PropTypes.object.isRequired
	}

	state = {
		name: '',
		selectedCards: {}
	}

	onEnter = () => {
		const {selectedCards} = this.state;

		// select cards previously added to deck
		_.forEach(this.props.deck.cards, (card) => {
			selectedCards[card.id] = true;
		});

		this.setState({selectedCards});
	}

	onClose = () => {
		// uncheck all cards
		this.setState({
			selectedCards: _.mapValues(this.state.selectedCards, () => false)
		});
		this.props.onClose();
	}

	onCheck = (cardId) => {
		this.setState({
			selectedCards: _.set(
				this.state.selectedCards,
				cardId,
				!this.state.selectedCards[cardId]
			)
		});
	}

	submit = () => {
		this.props.deck.edit({
			name: this.state.name,
			cards: _.reduce(this.state.selectedCards, (acc, isChecked, cardId) => {
				if (isChecked) {
					acc.push(CARDS[cardId]);
				}
				return acc;
			}, [])
		});
		this.onClose();
	}

	componentDidMount() {
		this.setState({name: this.props.deck.name});

		// convert card array into object of form {name: bool} where bool represents selection state
		this.setState({
			selectedCards: _.reduce(CARDS, (acc, card, cardId) => {
				acc[cardId] = false;
				return acc;
			}, {})
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
					selectedCards={this.state.selectedCards}
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
