import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import EditDialog from './edit-dialog';
import PlaneswalkIcon from '../../planeswalk-icon';

export default class Deck extends React.Component {

	state = {
		menuAnchor: null,
		showEditDialog: false
	}

	edit = () => {
		this.setState({
			menuAnchor: null,
			showEditDialog: true
		});
	}

	planeswalk = () => {
		this.setState({menuAnchor: null});
		this.props.deck.planeswalk();
	}

	remove = () => {
		this.setState({menuAnchor: null});
		this.props.deck.remove();
	}

	shuffle = () => {
		this.setState({menuAnchor: null});
		this.props.deck.shuffle();
	}

	render() {
		const {deck} = this.props;

		return (
			<div className="deck">
				<div className="deck-name">
					{deck.name || '[no name]'}
				</div>
				<div className="img-container" onClick={() => this.props.setMainDeckId(deck.id)}>
					<img src={_.get(deck, 'cards[0]', '../static/img/card-back.jpg')}/>
					<div className="deck-actions">
						<IconButton
							className="deck-action"
							onClick={this.planeswalk}
						>
							<PlaneswalkIcon fontSize="small"/>
						</IconButton>
						<IconButton
							className="deck-action"
							onClick={this.shuffle}
						>
							<Icon fontSize="small">shuffle</Icon>
						</IconButton>
						<IconButton
							className="deck-action"
							onClick={(e) => this.setState({ menuAnchor: e.currentTarget })}
						>
							<Icon fontSize="small">more_vert</Icon>
						</IconButton>
					</div>
				</div>
				<Menu
					id="deck-actions-menu"
					anchorEl={this.state.menuAnchor}
					open={!!this.state.menuAnchor}
					onClose={() => this.setState({ menuAnchor: null })}
				>
					<MenuItem onClick={this.edit}>
						<ListItemIcon>
							<Icon fontSize="small">edit</Icon>
						</ListItemIcon>
						<ListItemText primary="Edit"/>
					</MenuItem>
					<MenuItem onClick={this.remove}>
						<ListItemIcon>
							<Icon fontSize="small">delete_forever</Icon>
						</ListItemIcon>
						<ListItemText primary="Delete"/>
					</MenuItem>
				</Menu>
				<EditDialog
					open={this.state.showEditDialog}
					onClose={() => this.setState({ showEditDialog: false })}
					deck={deck}
				/>
			</div>
		);
	}
}

Deck.propTypes = {
	deck: PropTypes.object.isRequired
};
