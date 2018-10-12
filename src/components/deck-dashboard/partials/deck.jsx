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

	edit = () => {
		this.setState({
			showEditDialog: true
		});
	}

	render() {
		const {deck} = this.props;

		return (
			<div className="deck">
				<div className="deck-name">
					{deck.name || '[no name]'}
				</div>
				<CardButton
					card={_.get(deck, 'cards[0]')}
					onClick={() => this.props.setMainDeckId(deck.id)}
				/>
				<div className="deck-actions">
					<Tooltip placement="right" title="Save">
						<IconButton
							className="deck-action"
							onClick={deck.save}
						>
							<Icon fontSize="small">save</Icon>
						</IconButton>
					</Tooltip>
					<Tooltip placement="right" title="Edit">
						<IconButton
							className="deck-action"
							onClick={this.edit}
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
				<EditDialog
					open={this.state.showEditDialog}
					onClose={() => this.setState({ showEditDialog: false })}
					deck={deck}
				/>
			</div>
		);
	}
}
