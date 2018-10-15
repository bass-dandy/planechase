import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import EditDialog from './edit-dialog';
import CardButton from '../../card-button';
import PlaneswalkIcon from '../../planeswalk-icon';

export default class Deck extends React.Component {

	static propTypes = {
		deck: PropTypes.object.isRequired
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
		const {deck} = this.props;

		return (
			<div className="deck">
				<div className="deck-name">
					{deck.name || '[no name]'}
				</div>
				<div className="deck-container">
					<CardButton
						card={_.get(deck, 'cards[0]')}
						onClick={() => this.props.setMainDeckId(deck.id)}
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
