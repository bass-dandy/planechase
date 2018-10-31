import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import {Icon, IconButton, Tooltip} from '@material-ui/core';

import EditDialog from './edit-dialog';
import CardButton from '../../card-button';
import IsMobile from '../../is-mobile';

class Deck extends React.Component {

	static propTypes = {
		deck: PropTypes.object.isRequired,
		selectedDeck: PropTypes.object,
		isMobile: PropTypes.bool
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
		const {deck, selectedDeck, isMobile} = this.props;
		const selected = !_.isNil(selectedDeck) && _.get(selectedDeck, 'id') === deck.id;

		return (
			<div className="deck">
				<div className="deck-top-row">
					<div className="deck-name">
						{deck.name || '[no name]'}
					</div>
					<div className="deck-actions">
						<Tooltip placement="top" title="Edit">
							<IconButton
								className="deck-action"
								onClick={this.openEditDialog}
							>
								<Icon fontSize={isMobile ? 'default' : 'small'}>edit</Icon>
							</IconButton>
						</Tooltip>
						<Tooltip placement="top" title="Delete">
							<IconButton
								className="deck-action"
								onClick={deck.remove}
							>
								<Icon fontSize={isMobile ? 'default' : 'small'}>delete_forever</Icon>
							</IconButton>
						</Tooltip>
					</div>
				</div>
				<CardButton
					className={classnames({selected})}
					card={_.get(deck, 'cards[0]')}
					onClick={deck.select}
					label="Use This Deck"
				/>
				<EditDialog
					open={this.state.showEditDialog}
					onClose={this.closeEditDialog}
					deck={deck}
				/>
			</div>
		);
	}
}

export default IsMobile(Deck);
