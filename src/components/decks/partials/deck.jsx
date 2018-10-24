import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import {Icon, IconButton, Tooltip} from '@material-ui/core';

import EditDialog from './edit-dialog';
import CardButton from '../../card-button';

export default class Deck extends React.Component {

	static propTypes = {
		deck: PropTypes.object.isRequired,
		selectedDeck: PropTypes.object
	}

	state = {
		showEditDialog: false
	}

	openEditDialog = () => {
		this.setState({showEditDialog: true});
	}

	closeEditDialog = () => {
		this.setState({showEditDialog: false});
	}

	render() {
		const {deck, selectedDeck} = this.props;
		const selected = !_.isNil(selectedDeck) && _.get(selectedDeck, 'id') === deck.id;

		return (
			<div className="deck">
				<div className="deck-name">
					{deck.name || '[no name]'}
				</div>
				<div className="deck-container">
					<CardButton
						className={classnames({selected})}
						card={_.get(deck, 'cards[0]')}
						onClick={deck.select}
						label="Use This Deck"
					/>
					<div className="deck-actions">
						<Tooltip placement="right" title="Edit">
							<IconButton
								className="deck-action"
								onClick={this.openEditDialog}
							>
								<Icon fontSize="small">edit</Icon>
							</IconButton>
						</Tooltip>
						<Tooltip placement="right" title="Delete">
							<IconButton
								className="deck-action"
								onClick={deck.remove}
							>
								<Icon fontSize="small">delete_forever</Icon>
							</IconButton>
						</Tooltip>
					</div>
				</div>
				<EditDialog
					open={this.state.showEditDialog}
					onClose={this.closeEditDialog}
					deck={deck}
				/>
			</div>
		);
	}
}
