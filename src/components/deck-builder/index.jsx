import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from '@material-ui/core';

import DeckNameForm from './partials/deck-name-form';
import CardSelectionForm from './partials/card-selection-form';
import IsMobile from '../is-mobile';

class DeckBuilder extends React.Component {

	static propTypes = {
		open: PropTypes.bool,
		deck: PropTypes.object,
		addDeck: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		isMobile: PropTypes.bool
	}

	submit = () => {
		if (this.props.deck) {
			this.props.deck.setName(this.deckNameForm.value);
			this.props.deck.setCards(this.cardSelectionForm.value);
		} else {
			this.props.addDeck(this.deckNameForm.value, this.cardSelectionForm.value);
		}
		this.props.onClose();
	}

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.onClose}
				maxWidth="md"
				fullScreen={this.props.isMobile}
			>
				<DialogTitle>
					{this.props.deck ? 'Edit Deck' : 'Create New Deck'}
				</DialogTitle>
				<DialogContent className="edit-dialog-content">
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
					<Button
						onClick={this.submit}
						color="primary"
						variant="contained"
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default IsMobile(DeckBuilder);
