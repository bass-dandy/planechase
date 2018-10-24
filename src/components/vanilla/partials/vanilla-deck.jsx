import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Icon, IconButton, Tooltip} from '@material-ui/core';

import PlaneswalkIcon from '../../planeswalk-icon';

export default function MainDeck(props) {
	const disabled = !props.cards || props.cards.length <= 1;

	const topCardUrl = props.topCardOverride
		? props.topCardOverride.url
		: _.get(props, 'cards[0].url', '../static/img/card-back.jpg');

	return (
		<div className="main-deck">
			<div className="card-container">
				<img src={topCardUrl}/>
			</div>
			<Tooltip placement="bottom" title="Planeswalk">
				<IconButton
					className="deck-actions"
					onClick={props.planeswalk}
					disabled={disabled}
				>
					<PlaneswalkIcon/>
				</IconButton>
			</Tooltip>
			<Tooltip placement="bottom" title="Shuffle">
				<IconButton
					className="deck-actions"
					onClick={props.shuffle}
					disabled={disabled}
				>
					<Icon>shuffle</Icon>
				</IconButton>
			</Tooltip>
			<Tooltip placement="bottom" title="Set Card Aside">
				<IconButton
					className="deck-actions"
					onClick={props.pinCard}
					disabled={disabled}
				>
					<Icon>tab</Icon>
				</IconButton>
			</Tooltip>
		</div>
	);
}

MainDeck.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	planeswalk: PropTypes.func.isRequired,
	shuffle: PropTypes.func.isRequired,
	pinCard: PropTypes.func.isRequired,
	topCardOverride: PropTypes.object
};
