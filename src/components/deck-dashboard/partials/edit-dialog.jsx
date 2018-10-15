import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from '@material-ui/core';

import DeckNameForm from './deck-name-form';
import CardSelectionForm from '../../card-selection-form';

export default class EditDialog extends React.Component {

	static propTypes = {
		open: PropTypes.bool,
		onClose: PropTypes.func.isRequired,
		deck: PropTypes.object.isRequired
	}

	submit = () => {
		this.deckNameForm.submit();
		this.cardSelectionForm.submit();
		this.props.onClose();
	}

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.onClose}
			>
				<DialogTitle>Edit Deck</DialogTitle>
				<DialogContent>
					<DeckNameForm
						ref={(e) => { this.deckNameForm = e; }}
						deck={this.props.deck}
					/>
					<CardSelectionForm
						ref={(e) => { this.cardSelectionForm = e; }}
						deck={this.props.deck}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose}>
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
