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

	onCheck = (cardUrl) => {
		this.setState({
			cards: _.set(this.state.cards, cardUrl, !this.state.cards[cardUrl])
		});
	}

	submit = () => {
		this.props.deck.edit({
			name: this.state.name,
			cards: _.reduce(this.state.cards, (acc, isChecked, url) => {
				if (isChecked) {
					acc.push(url);
				}
				return acc;
			}, [])
		});
		this.props.onClose();
	}

	componentDidMount() {
		this.setState({name: this.props.deck.name});

		request
			.get('./api/card-urls')
			.then((res) => {
				// convert card url array into object of form {url: bool} where bool represents selection state
				const cards = _.reduce(res, (acc, url) => {
					acc[url] = false;
					return acc;
				}, {})

				// select cards previously added to deck
				_.forEach(this.props.deck.cards, (url) => {
					cards[url] = true;
				});

				this.setState({cards});
			});
	}

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.onClose}
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
					cardUrls={this.state.cards}
					onCheck={this.onCheck}
				/>
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